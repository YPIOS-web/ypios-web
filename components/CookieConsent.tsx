"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookie-consent-v1";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(KEY) : "accepted";
    if (!stored) setOpen(true);
  }, []);

  if (!open) return null;

  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white/95 backdrop-blur shadow-xl ring-1 ring-black/10 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-700">
            Nous utilisons des cookies strictement nécessaires pour le bon fonctionnement du site
            et, le cas échéant, des mesures d’audience anonymisées.{" "}
            <Link href="/politique-de-confidentialite" className="underline hover:no-underline">
              En savoir plus
            </Link>
            .
          </p>
          <div className="flex gap-2 sm:shrink-0">
            <button
              onClick={accept}
              className="inline-flex items-center rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
            >
              OK, compris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}