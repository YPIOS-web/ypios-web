"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { analytics } from "@/lib/analytics";
import { readAnalyticsConsent, subscribeConsent } from "@/lib/consent";

export default function AnalyticsConsent({
  gaId,
  production = false,
}: {
  gaId?: string;
  production?: boolean;
}) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const refresh = () => {
      analytics.configure(gaId, production);
      setAllowed(analytics.snapshot().enabled);
    };
    refresh();
    return subscribeConsent(refresh);
  }, [gaId, production]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (!readAnalyticsConsent() || !(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;
      const path = window.location.pathname;
      if (href.startsWith("mailto:")) {
        analytics.contact("email_click", path);
        return;
      }
      if (href.startsWith("tel:")) {
        analytics.contact("phone_click", path);
        return;
      }
      const target = new URL(anchor.href, window.location.origin);
      if (
        target.origin === window.location.origin &&
        target.pathname === "/contact" &&
        path !== "/contact"
      )
        analytics.contact("contact_intent", path);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  if (!allowed) return null;
  return (
    <Script
      id="ypios-ga"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="afterInteractive"
      onLoad={() => analytics.loaded()}
      onReady={() => analytics.loaded()}
      onError={() => analytics.failed()}
    />
  );
}
