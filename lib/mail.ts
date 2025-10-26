// lib/mail.ts
import nodemailer from "nodemailer";

type Attachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export async function sendMail({
  subject,
  text,
  html,
  attachments = [],
}: {
  subject: string;
  text: string;
  html?: string;
  attachments?: Attachment[];
}) {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const from = process.env.MAIL_FROM || `YPIOS Énergie <${user}>`;
  const to = process.env.MAIL_TO || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: html || text,
    attachments,
  });
}