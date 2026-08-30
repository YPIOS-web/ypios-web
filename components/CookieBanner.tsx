"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ypios-consent-v1";

type Consent = {
  essential: true;
  analytics: boolean;
  marketing?: boolean;
  updatedAt?: string;
};

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const consent: Consent = { essential: true, analytics, marketing: false, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("ypios:consent-changed", { detail: consent }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setVisible(true);
      return;
    }
    setAnalytics(Boolean(saved.analytics));
  }, []);

  const save = (value: boolean) => {
    writeConsent(value);
    setAnalytics(value);
    setVisible(false);
    setSettingsOpen(false);
  };

  const openSettings = () => {
    const saved = readConsent();
    setAnalytics(Boolean(saved?.analytics));
    setSettingsOpen(true);
  };

  return (
    <>
      {visible && !settingsOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-4xl rounded-[22px] border border-white/10 bg-[#0D1B3D]/95 p-4 text-white shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-white/76">
                Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord,
                une mesure d’audience. <Link href="/cookies" className="font-semibold text-white underline underline-offset-2">En savoir plus</Link>.
              </p>
              <div className="flex flex-wrap gap-2 sm:shrink-0">
                <button type="button" onClick={() => save(false)} className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/10">Refuser</button>
                <button type="button" onClick={openSettings} className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/10">Paramétrer</button>
                <button type="button" onClick={() => save(true)} className="rounded-full bg-[#FF7A00] px-4 py-2 text-xs font-bold text-white hover:bg-[#F36F00]">Accepter</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!visible ? (
        <button
          type="button"
          onClick={openSettings}
          className="fixed bottom-4 right-4 z-40 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-md backdrop-blur hover:text-[#0D1B3D]"
        >
          Cookies
        </button>
      ) : null}

      {settingsOpen ? (
        <div role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-[#0D1B3D]/55 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} aria-label="Fermer" />
          <div className="relative z-10 w-full max-w-lg rounded-[24px] bg-white p-6 shadow-2xl sm:p-7">
            <span className="ypios-kicker">Confidentialité</span>
            <h2 id="cookie-settings-title" className="ypios-heading mt-3 text-2xl font-bold">Préférences de cookies</h2>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-semibold text-[#0D1B3D]">Cookies essentiels</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">Nécessaires au fonctionnement et à la sécurité du site. Toujours actifs.</p>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#0D1B3D]"
                />
                <span>
                  <span className="block font-semibold text-[#0D1B3D]">Mesure d’audience</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">Autorise Google Analytics lorsque l’identifiant GA est configuré.</span>
                </span>
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => save(false)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Tout refuser</button>
              <button type="button" onClick={() => save(analytics)} className="rounded-full bg-[#0D1B3D] px-5 py-2 text-sm font-semibold text-white">Enregistrer</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
