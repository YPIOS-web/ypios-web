// app/api/contact/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // important: nodemailer nécessite le runtime Node

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // On supporte "multipart/form-data" (pièces jointes) et, par compatibilité, "application/json"
    let nom = "", email = "", tel = "", message = "";
    let attachments: { filename: string; content: Buffer; contentType?: string }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();

      nom = String(form.get("nom") || "");
      email = String(form.get("email") || "");
      tel = String(form.get("tel") || "");
      message = String(form.get("message") || "");

      // Récupérer toutes les pièces jointes
      const files = form.getAll("files").filter((v) => typeof v !== "string") as File[];
      // Garde-fous serveur (simples)
      const MAX_FILES = 5;
      const MAX_EACH = 8 * 1024 * 1024;   // 8 Mo
      const MAX_TOTAL = 20 * 1024 * 1024; // 20 Mo
      const ALLOWED = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

      if (files.length > MAX_FILES) {
        return new Response(JSON.stringify({ ok: false, error: "Trop de fichiers." }), { status: 400 });
      }

      let total = 0;
      for (const f of files) {
        total += f.size;
        if (f.size > MAX_EACH) {
          return new Response(JSON.stringify({ ok: false, error: `Fichier trop volumineux: ${f.name}` }), { status: 400 });
        }
        if (!ALLOWED.includes(f.type)) {
          return new Response(JSON.stringify({ ok: false, error: `Type non autorisé: ${f.name}` }), { status: 400 });
        }
        const buf = Buffer.from(await f.arrayBuffer());
        attachments.push({
          filename: f.name,
          content: buf,
          contentType: f.type || undefined,
        });
      }
      if (total > MAX_TOTAL) {
        return new Response(JSON.stringify({ ok: false, error: "Taille totale trop élevée." }), { status: 400 });
      }
    } else {
      // Compat: JSON simple (sans pièces jointes)
      const data = await req.json().catch(() => ({}));
      nom = String(data?.nom || "");
      email = String(data?.email || "");
      tel = String(data?.tel || "");
      message = String(data?.message || "");
    }

    if (!nom || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Champs requis manquants." }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure:
        String(process.env.SMTP_SECURE).toLowerCase() === "true" ||
        Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "";
    const to = process.env.SMTP_TO || process.env.SMTP_USER || "";

    await transporter.sendMail({
      from,
      to,
      subject: `Contact site — ${nom}`,
      replyTo: email || undefined,
      text:
        `Nom: ${nom}\n` +
        `Email: ${email || "-"}\n` +
        `Téléphone: ${tel || "-"}\n\n` +
        `Message:\n${message}\n`,
      attachments, // <= pièces jointes
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return new Response(JSON.stringify({ ok: false, error: "SERVER_ERROR" }), { status: 500 });
  }
}