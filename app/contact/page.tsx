// app/contact/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export const metadata: Metadata = {
  title: "Contact — YPIOS Énergie",
  description:
    "Devis, études, maintenance ou dépannage — contactez YPIOS Énergie. Pièces jointes et détails de votre besoin.",
};

/* ----------------------------- Bandeau ----------------------------- */
const IMG_BANNER =
  "/images/CTA%2C%20ventilation%2C%20d%C3%A9senfumage%2C%20%C3%A9quilibrage..png";

/* ----------------------------- Config PJ ----------------------------- */
const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
]);

/* ----------------------------- Server Action ----------------------------- */
async function sendContact(formData: FormData) {
  "use server";

  // Honeypot anti-bot
  const honey = (formData.get("website") as string) || "";
  if (honey.trim() !== "") {
    // Silencieux : on fait comme si c'était OK
    redirect("/contact?sent=1");
  }

  // (Optionnel) reCAPTCHA
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (siteKey && secretKey) {
    try {
      const token = (formData.get("g-recaptcha-response") as string) || "";
      const verify = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: secretKey,
            response: token,
          }),
        }
      );
      const res = (await verify.json()) as { success?: boolean; score?: number };
      if (!res.success) {
        redirect("/contact?error=captcha");
      }
    } catch {
      redirect("/contact?error=captcha");
    }
  }

  // Champs
  const nom = (formData.get("nom") as string) || "";
  const email = (formData.get("email") as string) || "";
  const tel = (formData.get("tel") as string) || "";
  const sujet = (formData.get("sujet") as string) || "";
  const type = (formData.get("type") as string) || "";
  const service = (formData.get("service") as string) || "";
  const message = (formData.get("message") as string) || "";

  // Pièces jointes
  const files = formData.getAll("files") as unknown as File[];
  if (files.length > MAX_FILES) {
    redirect(`/contact?error=maxfiles`);
  }
  const attachments = [];
  for (const f of files) {
    if (!f || typeof f.arrayBuffer !== "function") continue;
    if (f.size > MAX_FILE_SIZE) {
      redirect(`/contact?error=maxsize`);
    }
    if (ALLOWED_MIME.size && f.type && !ALLOWED_MIME.has(f.type)) {
      redirect(`/contact?error=type`);
    }
    const buf = Buffer.from(await f.arrayBuffer());
    attachments.push({
      filename: f.name || "piece-jointe",
      content: buf,
      contentType: f.type || "application/octet-stream",
    });
  }

  // Transport Nodemailer (OVH ou autre)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const cc = process.env.CONTACT_CC || "";

  const subject =
    (sujet && `Contact YPIOS — ${sujet}`) || "Contact YPIOS — Nouveau message";

  const plain = [
    `Nom: ${nom}`,
    `Email: ${email}`,
    `Téléphone: ${tel}`,
    `Type: ${type}`,
    `Service: ${service}`,
    "",
    `Message:`,
    message,
  ].join("\n");

  const html = `
    <h2>Contact depuis le site YPIOS</h2>
    <p><strong>Nom:</strong> ${nom || "-"}</p>
    <p><strong>Email:</strong> ${email || "-"}</p>
    <p><strong>Téléphone:</strong> ${tel || "-"}</p>
    <p><strong>Type:</strong> ${type || "-"}</p>
    <p><strong>Service:</strong> ${service || "-"}</p>
    <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({
    from,
    to,
    cc: cc || undefined,
    subject,
    text: plain,
    html,
    attachments,
    replyTo: email || undefined,
  });

  redirect("/contact?sent=1");
}

/* ----------------------------- Page ----------------------------- */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
  const sent = params?.sent === "1";
  const error = params?.error;

  return (
    <main id="contenu" className="min-h-screen bg-slate-50">
      {/* Charger reCAPTCHA uniquement si clé publique présente */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      {/* ===================== Bandeau plein écran ===================== */}
      <section className="relative w-full">
        <div className="relative h-[52vh] min-h-[420px] max-h-[680px]">
          <Image
            src={IMG_BANNER}
            alt="Bandeau — Contact"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-[12%] px-4 text-center">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl drop-shadow">
              Contact
            </h1>
            <p className="mt-2 text-white/90 max-w-[90ch] mx-auto text-sm sm:text-base">
              Devis, études, maintenance ou dépannage : dites-nous tout.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Formulaire ===================== */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Alertes */}
        {sent && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
            Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">
            {error === "captcha" &&
              "Vérification reCAPTCHA invalide. Merci de réessayer."}
            {error === "maxfiles" && "Trop de pièces jointes (max 5)."}
            {error === "maxsize" && "Une des pièces jointes dépasse 5 Mo."}
            {error === "type" &&
              "Type de fichier non autorisé (PDF, PNG, JPG uniquement)."}
          </div>
        )}

        <form
          action={sendContact}
          method="post"
          encType="multipart/form-data"
          className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
        >
          {/* honeypot */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                required
                maxLength={120}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="tel"
                maxLength={40}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                maxLength={160}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="vous@exemple.fr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Sujet
              </label>
              <input
                type="text"
                name="sujet"
                maxLength={160}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Devis, étude, dépannage…"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Type de demande
              </label>
              <select
                name="type"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="">—</option>
                <option>Devis / Étude</option>
                <option>Maintenance</option>
                <option>Dépannage</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Service
              </label>
              <select
                name="service"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="">—</option>
                <option>Climatisation</option>
                <option>Ventilation</option>
                <option>Plomberie</option>
                <option>GTC / GTB</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={6}
              maxLength={5000}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez votre besoin (site, contraintes, délais, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Pièces jointes (PDF, PNG, JPG — max 5 fichiers, 5&nbsp;Mo chacun)
            </label>
            <input
              type="file"
              name="files"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="mt-1 block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* reCAPTCHA si clé publique présente */}
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <div className="g-recaptcha"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          ) : null}

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Envoyer
            </button>
          </div>

          <p className="text-xs text-slate-500">
            En soumettant ce formulaire, vous acceptez que YPIOS Énergie traite vos
            informations pour répondre à votre demande.
          </p>
        </form>
      </section>
    </main>
  );
}