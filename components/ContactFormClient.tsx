// components/ContactFormClient.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  siteKey?: string;
  maxFiles?: number;
  maxTotalMb?: number;
};

export default function ContactFormClient({
  action,
  siteKey,
  maxFiles = 5,
  maxTotalMb = 10,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation simple côté client (nb de PJ et poids total)
  function validateFiles(files: FileList | null) {
    if (!files || files.length === 0) return true;
    if (files.length > maxFiles) {
      setError(`Vous pouvez joindre au maximum ${maxFiles} fichiers.`);
      return false;
    }
    const totalMb =
      Array.from(files).reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
    if (totalMb > maxTotalMb) {
      setError(`Le poids total des pièces jointes ne doit pas dépasser ${maxTotalMb} Mo.`);
      return false;
    }
    setError(null);
    return true;
  }

  // Honeypot : on empêche la soumission si le champ caché est rempli
  function botTripped(form: HTMLFormElement) {
    const hp = (form.elements.namedItem("website") as HTMLInputElement | null)?.value || "";
    return hp.trim().length > 0;
  }

  return (
    <form
      action={async (formData: FormData) => {
        setError(null);
        const files = (document.getElementById("files") as HTMLInputElement | null)?.files;
        const form = document.getElementById("contact-form") as HTMLFormElement | null;
        if (botTripped(form!)) {
          setError("Erreur : détection anti-bot.");
          return;
        }
        if (!validateFiles(files)) return;
        setSubmitting(true);
        try {
          await action(formData);
        } finally {
          setSubmitting(false);
        }
      }}
      id="contact-form"
      method="post"
      encType="multipart/form-data"
      className="space-y-4"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nom</label>
          <input
            name="nom"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Téléphone</label>
          <input
            type="tel"
            name="tel"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Sujet</label>
          <input
            name="sujet"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Message</label>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Pièces jointes (max {maxFiles}, {maxTotalMb} Mo au total)
        </label>
        <input
          id="files"
          name="files"
          type="file"
          multiple
          onChange={(e) => validateFiles(e.currentTarget.files)}
          className="mt-1 block w-full text-sm"
        />
      </div>

      {/* reCAPTCHA v2 (case à cocher) */}
      {siteKey && (
        <div className="g-recaptcha" data-sitekey={siteKey} />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "Envoi en cours…" : "Envoyer"}
      </button>
    </form>
  );
}