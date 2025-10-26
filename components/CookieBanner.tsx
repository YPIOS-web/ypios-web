// components/CookieBanner.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Consent = {
  essential: true;        // toujours vrai
  analytics: boolean;
  marketing: boolean;
};
const STORAGE_KEY = "ypios-consent-v1";

const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};

const writeConsent = (c: Consent) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  // Notifie le site (si tu ajoutes un loader analytics plus tard)
  window.dispatchEvent(new CustomEvent("ypios:consent-changed", { detail: c }));
};

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // États locaux (formulaire des préférences)
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const consent: Consent = useMemo(
    () => ({ essential: true, analytics, marketing }),
    [analytics, marketing]
  );

  useEffect(() => {
    // Affiche la barre si aucun consentement stocké
    const saved = readConsent();
    if (!saved) {
      setShowBar(true);
      setOpen(false);
    } else {
      setAnalytics(!!saved.analytics);
      setMarketing(!!saved.marketing);
      setShowBar(false);
    }
  }, []);

  const acceptAll = () => {
    const c: Consent = { essential: true, analytics: true, marketing: true };
    writeConsent(c);
    setAnalytics(true);
    setMarketing(true);
    setShowBar(false);
    setOpen(false);
  };

  const refuseAll = () => {
    const c: Consent = { essential: true, analytics: false, marketing: false };
    writeConsent(c);
    setAnalytics(false);
    setMarketing(false);
    setShowBar(false);
    setOpen(false);
  };

  const save = () => {
    writeConsent(consent);
    setShowBar(false);
    setOpen(false);
  };

  // Petit bouton flottant "Gérer mes cookies" (optionnel mais pratique)
  const ManagerButton = () => (
    <button
      aria-label="Gérer mes cookies"
      onClick={() => {
        const saved = readConsent();
        setAnalytics(!!saved?.analytics);
        setMarketing(!!saved?.marketing);
        setOpen(true);
      }}
      className="fixed bottom-4 right-4 z-40 rounded-full bg-white/80 px-4 py-2 text-sm shadow-lg backdrop-blur hover:bg-white"
    >
      Gérer mes cookies
    </button>
  );

  return (
    <>
      {/* Barre initiale */}
      {showBar && !open && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 sm:px-6 sm:pb-6">
          <div className="w-full max-w-4xl rounded-2xl bg-zinc-900/80 px-4 py-4 text-zinc-100 shadow-2xl backdrop-blur sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-5">
                Nous utilisons des cookies essentiels au fonctionnement du site
                et, avec votre accord, des cookies de mesure et marketing.{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="underline underline-offset-2 hover:text-white"
                >
                  En savoir plus
                </a>
                .
              </p>
              <div className="flex gap-2">
                <button
                  onClick={refuseAll}
                  className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                >
                  Tout refuser
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                >
                  Paramétrer
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton gestion persistante */}
      <ManagerButton />

      {/* Modale de préférences */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold">
              Préférences de cookies
            </h3>

            <div className="space-y-4">
              <fieldset className="rounded-xl border border-zinc-200 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-700">
                  Essentiels (toujours actifs)
                </legend>
                <p className="text-sm text-zinc-600">
                  Indispensables au fonctionnement du site (sécurité, session,
                  langue). Aucune donnée marketing n’est collectée via ces
                  cookies.
                </p>
              </fieldset>

              <fieldset className="rounded-xl border border-zinc-200 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-700">
                  Mesure d’audience
                </legend>
                <label className="mt-2 flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  Autoriser les cookies de mesure (ex. analytics).
                </label>
              </fieldset>

              <fieldset className="rounded-xl border border-zinc-200 p-4">
                <legend className="px-1 text-sm font-medium text-zinc-700">
                  Marketing
                </legend>
                <label className="mt-2 flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  Autoriser les cookies publicitaires/retargeting.
                </label>
              </fieldset>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={refuseAll}
                className="rounded-xl bg-zinc-100 px-3 py-2 text-sm hover:bg-zinc-200"
              >
                Tout refuser
              </button>
              <button
                onClick={save}
                className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Enregistrer
              </button>
              <button
                onClick={acceptAll}
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}