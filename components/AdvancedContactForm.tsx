// components/AdvancedContactForm.tsx
"use client";

import * as React from "react";

type UploadFile = {
  file: File;
  id: string;
};

export default function AdvancedContactForm() {
  const [pending, setPending] = React.useState(false);
  const [ok, setOk] = React.useState<null | boolean>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  const formRef = React.useRef<HTMLFormElement | null>(null);

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files;
    if (!f) return;
    const list: UploadFile[] = [];
    for (const file of Array.from(f)) {
      if (file.size > 8 * 1024 * 1024) {
        alert(`Fichier trop volumineux: ${file.name} (> 8 Mo)`);
        continue;
      }
      list.push({ file, id: crypto.randomUUID() });
    }
    setFiles((prev) => [...prev, ...list]);
    e.target.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setOk(null);
    setErr(null);

    try {
      const form = e.target as HTMLFormElement;
      const fd = new FormData(form);

      // Honeypot (anti-bot)
      if ((fd.get("company") as string)?.trim()) {
        throw new Error("Bot détecté");
      }

      // champs obligatoires
      const nom = (fd.get("nom") as string)?.trim();
      const email = (fd.get("email") as string)?.trim();
      const rgpd = fd.get("rgpd") === "on";
      if (!nom || !email || !rgpd) {
        throw new Error("Veuillez renseigner Nom, Email et consentement RGPD.");
      }

      // Ajout des fichiers
      files.forEach((f) => fd.append("files", f.file));

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Échec de l’envoi");
      }

      setOk(true);
      formRef.current?.reset();
      setFiles([]);
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Erreur inconnue");
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-4">
      {/* Honeypot (champ caché) */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nom / Société *</label>
          <input name="nom" className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email *</label>
          <input type="email" name="email" className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Téléphone</label>
          <input name="tel" className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Type de demande</label>
          <select name="type" className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
            <option>Ventilation</option>
            <option>Plomberie</option>
            <option>Climatisation</option>
            <option>GTC/GTB</option>
            <option>Dépannage</option>
            <option>Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Localisation (ville/dépt)</label>
          <input name="lieu" className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="urgence" className="h-4 w-4" />
          <span className="text-sm text-slate-700">Intervention urgente</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="siteOccupe" className="h-4 w-4" />
          <span className="text-sm text-slate-700">Site occupé</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Votre besoin *</label>
        <textarea name="message" rows={5} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Pièces jointes (PNG/JPG/PDF, 8 Mo max)</label>
        <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" onChange={onPickFiles}
          className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-sm hover:file:bg-slate-50" />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {files.map((f) => (
              <li key={f.id} className="flex items-center justify-between">
                <span>{f.file.name} — {(f.file.size/1024/1024).toFixed(2)} Mo</span>
                <button type="button" onClick={() => removeFile(f.id)} className="text-red-600 hover:underline">
                  retirer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="inline-flex items-start gap-2">
        <input type="checkbox" name="rgpd" className="mt-1 h-4 w-4" required />
        <span className="text-sm text-slate-700">
          J’accepte que mes données soient utilisées pour être recontacté(e) au sujet de ma demande.
          (<a className="underline" href="/mentions-legales" target="_blank">Mentions légales & CGU</a>)
        </span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {pending ? "Envoi…" : "Envoyer ma demande"}
        </button>
        {ok === true && <span className="text-sm text-green-700">Message envoyé ✅</span>}
        {ok === false && <span className="text-sm text-red-700">Erreur : {err}</span>}
      </div>
    </form>
  );
}