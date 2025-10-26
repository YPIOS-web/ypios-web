// app/politique-des-cookies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies — YPIOS Énergie",
  description:
    "Informations sur les cookies utilisés, leur finalité et vos choix (consentement, retrait).",
};

export default function CookiesPage() {
  return (
    <main>
      {/* Bandeau titre transparent (comme les autres pages) */}
      <section className="relative h-40 sm:h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="rounded-full bg-black/25 backdrop-blur-sm text-white px-5 py-2 ring-1 ring-white/15">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Politique de cookies
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-slate max-w-none">
          <h2>1. À quoi servent les cookies ?</h2>
          <p>
            Des petits fichiers (cookies) peuvent être déposés sur votre appareil pour assurer le bon
            fonctionnement du site, mémoriser vos préférences et, si vous l’acceptez, mesurer de façon
            anonymisée l’audience.
          </p>

          <h2>2. Catégories utilisées</h2>
          <ul>
            <li>
              <strong>Strictement nécessaires</strong> (obligatoires) : sécurité, session, affichage.
            </li>
            <li>
              <strong>Mesure d’audience anonymisée</strong> (optionnelle) : comprendre les usages pour
              améliorer l’ergonomie (sans piste d’identification).
            </li>
          </ul>

          <h2>3. Vos choix</h2>
          <p>
            Vous pouvez accepter/refuser la mesure d’audience anonymisée à tout moment ci-dessous.
            Les cookies strictement nécessaires sont toujours actifs.
          </p>

          <CookiePrefs />
        </div>
      </section>
    </main>
  );
}

/* ---------- Petit composant client pour gérer les préférences ---------- */
"use client";
import { useEffect, useState } from "react";

const KEY_CONSENT = "cookie-consent-v1";
const KEY_PREFS = "cookie-prefs-v1";

function CookiePrefs() {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(KEY_CONSENT);
      setAccepted(!!c);
      const pRaw = localStorage.getItem(KEY_PREFS);
      if (pRaw) {
        const p = JSON.parse(pRaw) as { analytics: boolean };
        setAnalytics(!!p.analytics);
      }
    } catch {}
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const save = () => {
    localStorage.setItem(KEY_CONSENT, "accepted");
    localStorage.setItem(KEY_PREFS, JSON.stringify({ analytics }));
    setAccepted(true);
    alert("Vos préférences ont été enregistrées.");
  };
  const revoke = () => {
    localStorage.removeItem(KEY_CONSENT);
    localStorage.removeItem(KEY_PREFS);
    setAccepted(false);
    setAnalytics(false);
    alert("Consentement retiré.");
  };

  return (
    <div className="mt-4 rounded-2xl ring-1 ring-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          Autoriser la mesure d’audience anonymisée
        </label>
        <div className="flex gap-2">
          <button
            onClick={save}
            className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            Enregistrer
          </button>
          <button
            onClick={revoke}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Retirer mon consentement
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        État : {accepted ? "consentement donné" : "consentement non donné"}.
      </p>
    </div>
  );
}