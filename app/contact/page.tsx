import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Devis, études, maintenance ou dépannage : contactez YPIOS et transmettez les éléments utiles à votre demande.",
  alternates: { canonical: "/contact" },
};

const IMG_BANNER = "/images/chantier/saint-quentin-hero.webp";
const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 8 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(clientKey: string) {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(clientKey);
  if (!current) {
    rateLimitStore.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

function detectAttachmentType(content: Buffer, filename: string) {
  const name = filename.toLowerCase();
  const isPdf = content.subarray(0, 5).toString("ascii") === "%PDF-";
  const isPng = content.length >= 8 && content.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isJpeg = content.length >= 3 && content[0] === 0xff && content[1] === 0xd8 && content[2] === 0xff;

  if (name.endsWith(".pdf") && isPdf) return "application/pdf";
  if (name.endsWith(".png") && isPng) return "image/png";
  if ((name.endsWith(".jpg") || name.endsWith(".jpeg")) && isJpeg) return "image/jpeg";
  return null;
}

function safeFilename(filename: string) {
  const normalized = filename.normalize("NFKC").replace(/[^a-zA-Z0-9._() -]/g, "_");
  return normalized.replace(/\s+/g, " ").slice(0, 120) || "piece-jointe";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendContact(formData: FormData) {
  "use server";

  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim();
  if (clientIp && isRateLimited(clientIp)) redirect("/contact?error=rate");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (siteKey && secretKey) {
    let captchaValid = false;
    try {
      const token = String(formData.get("g-recaptcha-response") || "");
      const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: secretKey, response: token }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      const result = (await verify.json()) as { success?: boolean };
      captchaValid = Boolean(result.success);
    } catch {}
    if (!captchaValid) redirect("/contact?error=captcha");
  }

  const nom = String(formData.get("nom") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const tel = String(formData.get("tel") || "").trim();
  const sujet = String(formData.get("sujet") || "").replace(/[\r\n]+/g, " ").trim();
  const typeRaw = String(formData.get("type") || "").trim();
  const serviceRaw = String(formData.get("service") || "").trim();
  const type = new Set(["Devis / Étude", "Maintenance", "Dépannage", "Autre"]).has(typeRaw) ? typeRaw : "";
  const service = new Set(["Climatisation", "Ventilation", "Plomberie", "GTC / GTB"]).has(serviceRaw) ? serviceRaw : "";
  const message = String(formData.get("message") || "").trim();

  const invalidLength = nom.length > 120 || email.length > 160 || tel.length > 40 || sujet.length > 160 || message.length > 5000;
  if (!nom || !email || !message || invalidLength || !/^\S+@\S+\.\S+$/.test(email)) {
    redirect("/contact?error=fields");
  }

  const files = (formData.getAll("files") as File[]).filter((file) => file instanceof File && file.size > 0);
  if (files.length > MAX_FILES) redirect("/contact?error=maxfiles");

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) redirect("/contact?error=totalsize");

  const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) redirect("/contact?error=maxsize");
    const content = Buffer.from(await file.arrayBuffer());
    const contentType = detectAttachmentType(content, file.name || "");
    if (!contentType) redirect("/contact?error=type");
    attachments.push({
      filename: safeFilename(file.name || "piece-jointe"),
      content,
      contentType,
    });
  }

  const host = process.env.SMTP_HOST || "ssl0.ovh.net";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass || !Number.isInteger(port) || port < 1 || port > 65_535) redirect("/contact?error=mail");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  const to = process.env.CONTACT_TO || user;
  const from = process.env.SMTP_FROM || user;
  const cc = process.env.CONTACT_CC || "";
  const subjectLine = sujet ? `Contact YPIOS — ${sujet}` : "Contact YPIOS — Nouveau message";

  const plain = [
    `Nom: ${nom}`,
    `Email: ${email}`,
    `Téléphone: ${tel}`,
    `Type: ${type}`,
    `Service: ${service}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>Contact depuis le site YPIOS</h2>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(tel || "-")}</p>
    <p><strong>Type :</strong> ${escapeHtml(type || "-")}</p>
    <p><strong>Service :</strong> ${escapeHtml(service || "-")}</p>
    <p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  let mailSent = false;
  try {
    const info = await transporter.sendMail({
      from,
      to,
      cc: cc || undefined,
      subject: subjectLine,
      text: plain,
      html,
      attachments,
      replyTo: email,
    });

    const acceptedCount = info.accepted?.length || 0;
    const rejectedCount = info.rejected?.length || 0;
    mailSent = acceptedCount > 0;

    console.info("[contact] SMTP response", {
      messageId: info.messageId,
      acceptedCount,
      rejectedCount,
      attachmentCount: attachments.length,
      attachmentBytes: totalSize,
      delivered: mailSent,
    });
  } catch (error) {
    const smtpError = error as {
      code?: string;
      command?: string;
      responseCode?: number;
    };
    console.error("[contact] SMTP error", {
      code: smtpError.code,
      command: smtpError.command,
      responseCode: smtpError.responseCode,
      attachmentCount: attachments.length,
      attachmentBytes: totalSize,
    });
  }
  if (!mailSent) redirect("/contact?error=mail");

  redirect("/contact?sent=1");
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#00A7C9] focus:ring-4 focus:ring-[#00B7DB]/10";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
  const sent = params?.sent === "1";
  const error = sent ? undefined : params?.error;

  return (
    <main id="contenu" className="bg-white">
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      ) : null}

      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image src={IMG_BANNER} alt="Installation technique YPIOS" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.95)_0%,rgba(13,27,61,0.74)_52%,rgba(13,27,61,0.3)_100%)]" />
        </div>
        <div className="ypios-container relative flex min-h-[480px] items-end py-16 sm:min-h-[520px] sm:py-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">Contact</span>
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] sm:text-6xl">Parlons de votre besoin.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              Devis, étude, maintenance, dépannage ou reprise d’installation : transmettez-nous le contexte et les documents utiles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-[26px] bg-[#0D1B3D] p-7 text-white sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#57D4EA]">YPIOS</span>
            <h2 className="mt-3 text-2xl font-bold">Un premier échange suffit souvent à cadrer la suite.</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Site, symptômes, contraintes d’exploitation, délais, photos ou rapports : envoyez ce que vous avez. Nous organiserons les informations avec vous.
            </p>
            <div className="mt-7 space-y-4 border-t border-white/12 pt-6 text-sm text-white/78">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">E-mail</div>
                <a href="mailto:contact@ypios.fr" className="mt-1 block font-semibold text-white">contact@ypios.fr</a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">Adresse</div>
                <p className="mt-1">2, rue des Hauts Sablons<br />91310 Leuville-sur-Orge</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">Zone</div>
                <p className="mt-1">Île-de-France</p>
              </div>
            </div>
          </aside>

          <div>
            {sent ? (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
                Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.
              </div>
            ) : null}

            {error ? (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
                {error === "captcha" && "Vérification reCAPTCHA invalide. Merci de réessayer."}
                {error === "fields" && "Merci de renseigner un nom, une adresse e-mail valide et un message."}
                {error === "maxfiles" && "Trop de pièces jointes : 5 fichiers maximum."}
                {error === "maxsize" && "Une pièce jointe dépasse 5 Mo."}
                {error === "totalsize" && "L’ensemble des pièces jointes dépasse 8 Mo."}
                {error === "type" && "Type de fichier non autorisé : PDF, PNG, JPG uniquement."}
                {error === "rate" && "Trop de tentatives rapprochées. Merci de patienter quelques minutes avant de réessayer."}
                {error === "mail" && "Impossible d’envoyer le message pour le moment. Merci de réessayer plus tard."}
              </div>
            ) : null}

            <form action={sendContact} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(13,27,61,0.07)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  Nom *
                  <input name="nom" required maxLength={120} autoComplete="name" className={fieldClass} placeholder="Votre nom" />
                </label>
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  Téléphone
                  <input name="tel" type="tel" maxLength={40} autoComplete="tel" className={fieldClass} placeholder="06 12 34 56 78" />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  E-mail *
                  <input name="email" type="email" required maxLength={160} autoComplete="email" className={fieldClass} placeholder="vous@entreprise.fr" />
                </label>
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  Sujet
                  <input name="sujet" maxLength={160} className={fieldClass} placeholder="Devis, étude, dépannage…" />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  Type de demande
                  <select name="type" className={fieldClass} defaultValue="">
                    <option value="">—</option>
                    <option>Devis / Étude</option>
                    <option>Maintenance</option>
                    <option>Dépannage</option>
                    <option>Autre</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#0D1B3D]">
                  Service
                  <select name="service" className={fieldClass} defaultValue="">
                    <option value="">—</option>
                    <option>Climatisation</option>
                    <option>Ventilation</option>
                    <option>Plomberie</option>
                    <option>GTC / GTB</option>
                  </select>
                </label>
              </div>

              <label className="mt-5 block text-sm font-semibold text-[#0D1B3D]">
                Message *
                <textarea name="message" required rows={7} maxLength={5000} className={fieldClass} placeholder="Décrivez le site, le besoin, les contraintes, les délais…" />
              </label>

              <label className="mt-5 block text-sm font-semibold text-[#0D1B3D]">
                Pièces jointes
                <span className="mt-1 block text-xs font-normal text-slate-500">PDF, PNG, JPG — 5 fichiers maximum, 5 Mo par fichier, 8 Mo au total.</span>
                <input
                  type="file"
                  name="files"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0D1B3D] file:px-4 file:py-2 file:font-semibold file:text-white"
                />
              </label>

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <div className="g-recaptcha mt-6" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
              ) : null}

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-xs leading-5 text-slate-500">
                  En soumettant ce formulaire, vous acceptez que YPIOS traite ces informations afin de répondre à votre demande. Consultez notre{" "}
                  <Link href="/politique-confidentialite" className="font-semibold text-[#0D1B3D] underline underline-offset-2">politique de confidentialité</Link>.
                </p>
                <button type="submit" className="ypios-button-primary shrink-0">Envoyer →</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
