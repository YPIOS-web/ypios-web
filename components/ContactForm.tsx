"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/contact/actions";
import { analytics } from "@/lib/analytics";
import { contactErrors, type ContactState } from "@/lib/contact-state";
const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#00A7C9] focus:ring-4 focus:ring-[#00B7DB]/10";
type CaptchaWindow = Window & { grecaptcha?: { reset: () => void } };
export default function ContactForm({
  submissionId,
  siteKey,
}: {
  submissionId: string;
  siteKey?: string;
}) {
  // Keep the Server Action reference intact for progressive enhancement.
  const [state, formAction, pending] = useActionState(
    sendContact,
    { status: "idle", submissionId } as ContactState,
    "/contact",
  );
  const locked = useRef(false);
  useEffect(() => {
    locked.current = false;
    if (state.status === "success" && state.requestId)
      analytics.lead(state.requestId);
    if (state.status !== "idle") {
      try {
        (window as CaptchaWindow).grecaptcha?.reset();
      } catch {}
    }
  }, [state]);
  return (
    <div>
      {state.status === "success" ? (
        <div
          role="status"
          className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800"
        >
          Merci, votre message a bien été envoyé. Nous revenons vers vous
          rapidement.
        </div>
      ) : null}
      {state.error ? (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800"
        >
          {contactErrors[state.error]}
        </div>
      ) : null}
      <form
        action={formAction}
        aria-busy={pending}
        onSubmit={(event) => {
          if (locked.current || pending) {
            event.preventDefault();
            return;
          }
          locked.current = true;
        }}
        className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(13,27,61,0.07)] sm:p-8"
      >
        <input type="hidden" name="submissionId" value={state.submissionId} />
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-[#0D1B3D]">
            Nom *
            <input
              name="nom"
              required
              maxLength={120}
              autoComplete="name"
              className={fieldClass}
              placeholder="Votre nom"
            />
          </label>
          <label className="text-sm font-semibold text-[#0D1B3D]">
            Téléphone
            <input
              name="tel"
              type="tel"
              maxLength={40}
              autoComplete="tel"
              className={fieldClass}
              placeholder="06 12 34 56 78"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-[#0D1B3D]">
            E-mail *
            <input
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
              className={fieldClass}
              placeholder="vous@entreprise.fr"
            />
          </label>
          <label className="text-sm font-semibold text-[#0D1B3D]">
            Sujet
            <input
              name="sujet"
              maxLength={160}
              className={fieldClass}
              placeholder="Devis, étude, dépannage…"
            />
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
          <textarea
            name="message"
            required
            rows={7}
            maxLength={5000}
            className={fieldClass}
            placeholder="Décrivez le site, le besoin, les contraintes, les délais…"
          />
        </label>

        <label className="mt-5 block text-sm font-semibold text-[#0D1B3D]">
          Pièces jointes
          <span className="mt-1 block text-xs font-normal text-slate-500">
            PDF, PNG, JPG — 5 fichiers maximum, 5 Mo par fichier, 8 Mo au total.
          </span>
          <input
            type="file"
            name="files"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-2 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0D1B3D] file:px-4 file:py-2 file:font-semibold file:text-white"
          />
        </label>

        {siteKey ? (
          <div className="g-recaptcha mt-6" data-sitekey={siteKey} />
        ) : null}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-xs leading-5 text-slate-500">
            En soumettant ce formulaire, vous acceptez que YPIOS traite ces
            informations afin de répondre à votre demande. Consultez notre{" "}
            <Link
              href="/politique-confidentialite"
              className="font-semibold text-[#0D1B3D] underline underline-offset-2"
            >
              politique de confidentialité
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={pending}
            className="ypios-button-primary shrink-0 disabled:opacity-60"
          >
            {pending ? "Envoi en cours…" : "Envoyer →"}
          </button>
        </div>
      </form>
    </div>
  );
}
