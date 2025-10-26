// components/ContactForm.tsx
"use client";

import * as React from "react";

const MAX_FILES = 5;
const MAX_EACH = 8 * 1024 * 1024;   // 8 Mo par fichier
const MAX_TOTAL = 20 * 1024 * 1024; // 20 Mo au total
const ALLOWED = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function ContactForm() {
  const [state, setState] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = React.useState<string>("");
  const [filesInfo, setFilesInfo] = React.useState<string>("");

  function validateFiles(input: HTMLInputElement): string | null {
    const fl = input.files;
    if (!fl) return null;

    if (fl.length > MAX_FILES) {
      return `Trop de fichiers (max ${MAX_FILES}).`;
    }

    let total = 0;
    for (let i = 0; i < fl.length; i++) {
      const f = fl[i]!;
      total += f.size;
      if (f.size > MAX_EACH) {
        return `Le fichier "${f.name}" dépasse ${Math.round(MAX_EACH / 1024 / 1024)} Mo.`;
      }
      if (!ALLOWED.includes(f.type)) {
        return `Type non autorisé pour "${f.name}". Formats permis : PDF, JPG, PNG, WEBP.`;
      }
    }
    if (total > MAX_TOTAL) {
      return `Taille totale trop élevée (>${Math.round(MAX_TOTAL / 1024 / 1024)} Mo).`;
    }
    return null;
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const err = validateFiles(e.currentTarget);
    if (err) {
      setFilesInfo("");
      setError(err);
    } else {
      setError("");
      const fl = e.currentTarget.files;
      if (!fl || fl.length === 0) {
        setFilesInfo("");
      } else {
        const names = Array.from(fl).map((f) => `${f.name} (${Math.ceil(f.size/1024)} Ko)`);
        setFilesInfo(`${fl.length} fichier(s) : ${names.join(", ")}`);
      }
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const formEl = e.currentTarget;
    const fileInput = formEl.elements.namedItem("files") as HTMLInputElement | null;

    // Validation côté client
    if (fileInput) {
      const verr = validateFiles(fileInput);
      if (verr) {
        setError(verr);
        setState("error");
        return;
      }
    }

    // Envoi en multipart/form-data (pour joindre les fichiers)
    const fd = new FormData(formEl);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error || "Une erreur est survenue.");
        setState("error");
        return;
      }

      setState("ok");
      formEl.reset();
      setFilesInfo("");
    } catch {
      setError("Impossible d’envoyer le message.");
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="nom"
          placeholder="Nom / Société"
          className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="tel"
          placeholder="Téléphone"
          className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email (pour vous répondre)"
        className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200"
      />

      <textarea
        name="message"
        placeholder="Votre besoin (site, pannes, travaux, maintenance…)"
        rows={4}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
        required
      />

      <div className="space-y-1">
        <label className="block text-sm text-slate-600">
          Joindre des fichiers (PDF, JPG, PNG, WEBP — max {MAX_FILES} fichiers, {Math.round(MAX_EACH/1024/1024)} Mo/fichier, {Math.round(MAX_TOTAL/1024/1024)} Mo total)
        </label>
        <input
          type="file"
          name="files"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={onFilesChange}
          className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 hover:file:bg-slate-50"
        />
        {filesInfo && <p className="text-xs text-slate-500">{filesInfo}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {state === "sending" ? "Envoi…" : "Envoyer"}
        </button>
        {state === "ok" && (
          <span className="text-sm text-green-600">
            Message envoyé. Nous revenons vers vous rapidement.
          </span>
        )}
        {state === "error" && (
          <span className="text-sm text-red-600">{error}</span>
        )}
      </div>
    </form>
  );
}