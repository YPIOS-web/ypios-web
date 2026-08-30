"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ypios-consent-v1";

type Consent = { analytics?: boolean };

export default function AnalyticsConsent({ gaId }: { gaId?: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const refresh = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const consent = raw ? (JSON.parse(raw) as Consent) : null;
        setAllowed(Boolean(consent?.analytics));
      } catch {
        setAllowed(false);
      }
    };

    refresh();
    window.addEventListener("ypios:consent-changed", refresh as EventListener);
    return () => window.removeEventListener("ypios:consent-changed", refresh as EventListener);
  }, []);

  if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId) || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { cookie_flags: 'SameSite=None;Secure' });
        `}
      </Script>
    </>
  );
}
