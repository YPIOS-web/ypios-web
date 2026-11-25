"use server";
import { headers } from "next/headers";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { createContactHandler } from "@/lib/contact";
import type { ContactState } from "@/lib/contact-state";
const handle = createContactHandler({
  env: () => process.env,
  fetch: (...args) => fetch(...args),
  sendMail: (options, message) =>
    nodemailer.createTransport(options).sendMail(message),
  log: (message, details) => console.info(message, details),
});
export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  try {
    const requestHeaders = await headers();
    const ip =
      requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      requestHeaders.get("x-real-ip")?.trim();
    return await handle(formData, ip);
  } catch {
    return { status: "error", submissionId: randomUUID(), error: "mail" };
  }
}
