import { createHash, randomUUID } from "node:crypto";
import addressparser from "nodemailer/lib/addressparser";
import type Mail from "nodemailer/lib/mailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { ContactState } from "./contact-state";
type Dependencies = {
  env: () => Record<string, string | undefined>;
  fetch: typeof fetch;
  sendMail: (
    options: SMTPTransport.Options,
    message: Mail.Options,
  ) => Promise<{
    accepted?: (string | { address: string })[];
    rejected?: unknown[];
    messageId?: string;
  }>;
  log: (message: string, details: Record<string, unknown>) => void;
  now?: () => number;
};
const MAX_FILES = 5,
  MAX_FILE_SIZE = 5 * 1024 * 1024,
  MAX_TOTAL_SIZE = 8 * 1024 * 1024;
const WINDOW = 10 * 60 * 1000;
const UUID =
  /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
function detectAttachmentType(content: Buffer, filename: string) {
  const name = filename.toLowerCase();
  const isPdf = content.subarray(0, 5).toString("ascii") === "%PDF-";
  const isPng =
    content.length >= 8 &&
    content
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isJpeg =
    content.length >= 3 &&
    content[0] === 0xff &&
    content[1] === 0xd8 &&
    content[2] === 0xff;

  if (name.endsWith(".pdf") && isPdf) return "application/pdf";
  if (name.endsWith(".png") && isPng) return "image/png";
  if ((name.endsWith(".jpg") || name.endsWith(".jpeg")) && isJpeg)
    return "image/jpeg";
  return null;
}

function safeFilename(filename: string) {
  const normalized = filename
    .normalize("NFKC")
    .replace(/[^a-zA-Z0-9._() -]/g, "_");
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

export function createContactHandler(deps: Dependencies) {
  const rates = new Map<string, { count: number; resetAt: number }>();
  // Instance-local protection, not a durable multi-instance exactly-once guarantee.
  const requests = new Map<
    string,
    { hash: string; expires: number; result: Promise<ContactState> }
  >();
  const now = deps.now || Date.now;
  const log: Dependencies["log"] = (message, details) => {
    try {
      deps.log(message, details);
    } catch {
      /* A logging failure must not turn SMTP acceptance into a retry. */
    }
  };
  return async function handle(
    formData: FormData,
    clientIp?: string,
  ): Promise<ContactState> {
    const rawId = String(formData.get("submissionId") || "");
    const submissionId = UUID.test(rawId) ? rawId : randomUUID();
    const error = (code: NonNullable<ContactState["error"]>): ContactState => ({
      status: "error",
      submissionId,
      error: code,
    });
    if (!UUID.test(rawId)) return error("fields");
    // Preserve the IP limit before validating or buffering attachments.
    if (clientIp) {
      for (const [key, item] of rates)
        if (item.resetAt <= now()) rates.delete(key);
      const rate = rates.get(clientIp);
      if (rate && rate.count >= 5) return error("rate");
      if (rate) rate.count++;
      else {
        if (rates.size >= 10_000) return error("rate");
        rates.set(clientIp, { count: 1, resetAt: now() + WINDOW });
      }
    }
    const config = deps.env();
    const nom = String(formData.get("nom") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const tel = String(formData.get("tel") || "").trim();
    const sujet = String(formData.get("sujet") || "")
      .replace(/[\r\n]+/g, " ")
      .trim();
    const typeRaw = String(formData.get("type") || "").trim();
    const serviceRaw = String(formData.get("service") || "").trim();
    const type = new Set([
      "Devis / Étude",
      "Maintenance",
      "Dépannage",
      "Autre",
    ]).has(typeRaw)
      ? typeRaw
      : "";
    const service = new Set([
      "Climatisation",
      "Ventilation",
      "Plomberie",
      "GTC / GTB",
    ]).has(serviceRaw)
      ? serviceRaw
      : "";
    const message = String(formData.get("message") || "").trim();

    const invalidLength =
      nom.length > 120 ||
      email.length > 160 ||
      tel.length > 40 ||
      sujet.length > 160 ||
      message.length > 5000;
    if (
      !nom ||
      !email ||
      !message ||
      invalidLength ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return error("fields");
    }

    const files = (formData.getAll("files") as File[]).filter(
      (file) => file instanceof File && file.size > 0,
    );
    if (files.length > MAX_FILES) return error("maxfiles");

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) return error("totalsize");

    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [];
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) return error("maxsize");
      const content = Buffer.from(await file.arrayBuffer());
      const contentType = detectAttachmentType(content, file.name || "");
      if (!contentType) return error("type");
      attachments.push({
        filename: safeFilename(file.name || "piece-jointe"),
        content,
        contentType,
      });
    }

    for (const [key, item] of requests)
      if (item.expires <= now()) requests.delete(key);
    const hash = createHash("sha256").update(
      JSON.stringify([nom, email, tel, sujet, type, service, message]),
    );
    for (const attachment of attachments)
      hash
        .update(
          JSON.stringify([attachment.filename, attachment.content.length]),
        )
        .update(attachment.content);
    const fingerprint = hash.digest("hex");
    const cached = requests.get(submissionId);
    if (cached)
      return cached.hash === fingerprint ? cached.result : error("duplicate");
    if (requests.size >= 1000) return error("rate");
    const requestId = randomUUID();
    async function execute(): Promise<ContactState> {
      const siteKey = config.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const secretKey = config.RECAPTCHA_SECRET_KEY;
      if (Boolean(siteKey) !== Boolean(secretKey)) return error("captcha");
      if (siteKey && secretKey) {
        let captchaValid = false;
        try {
          const token = String(formData.get("g-recaptcha-response") || "");
          const verify = await deps.fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({ secret: secretKey, response: token }),
              cache: "no-store",
              signal: AbortSignal.timeout(10_000),
            },
          );
          const result = (await verify.json()) as { success?: boolean };
          captchaValid = result.success === true;
        } catch {}
        if (!captchaValid) return error("captcha");
      }

      const host = config.SMTP_HOST || "ssl0.ovh.net";
      const port = Number(config.SMTP_PORT || 465);
      const secure = String(config.SMTP_SECURE || "true") === "true";
      const user = config.SMTP_USER;
      const pass = config.SMTP_PASS;

      if (
        !user ||
        !pass ||
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65_535
      )
        return error("mail");

      const transportOptions = {
        host,
        port,
        secure,
        auth: { user, pass },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      };
      const to = config.CONTACT_TO || user;
      const from = config.SMTP_FROM || user;
      const cc = config.CONTACT_CC || "";
      const subjectLine = sujet
        ? `Contact YPIOS — ${sujet}`
        : "Contact YPIOS — Nouveau message";

      const plain = [
        `Référence: ${requestId}`,
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
    <p><strong>Référence :</strong> ${requestId}</p>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(tel || "-")}</p>
    <p><strong>Type :</strong> ${escapeHtml(type || "-")}</p>
    <p><strong>Service :</strong> ${escapeHtml(service || "-")}</p>
    <p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

      let mailSent = false;
      try {
        const info = await deps.sendMail(transportOptions, {
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
        const principals = addressparser(to, { flatten: true }).map((item) =>
          item.address.toLowerCase(),
        );
        const accepted = new Set(
          (info.accepted || []).map((item) =>
            typeof item === "string"
              ? item.toLowerCase()
              : item.address.toLowerCase(),
          ),
        );
        mailSent =
          principals.length > 0 &&
          principals.every((address) => accepted.has(address));

        log("[contact] SMTP response", {
          messageId: info.messageId,
          acceptedCount,
          rejectedCount,
          attachmentCount: attachments.length,
          attachmentBytes: totalSize,
          smtpAcceptedPrimary: mailSent,
          requestId,
        });
      } catch (error) {
        const smtpError = error as {
          code?: string;
          command?: string;
          responseCode?: number;
        };
        log("[contact] SMTP error", {
          code: smtpError.code,
          command: smtpError.command,
          responseCode: smtpError.responseCode,
          attachmentCount: attachments.length,
          attachmentBytes: totalSize,
          requestId,
        });
      }
      if (!mailSent) return error("mail");

      return { status: "success", submissionId: randomUUID(), requestId };
    }
    const result = execute().catch(() => error("mail"));
    requests.set(submissionId, {
      hash: fingerprint,
      expires: now() + WINDOW,
      result,
    });
    const state = await result;
    if (state.status !== "success") requests.delete(submissionId);
    return state;
  };
}
