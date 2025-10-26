// components/JsonLd.tsx
"use client";

import Script from "next/script";

export default function JsonLd() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "YPIOS Énergie",
    url: site,
    email: "contact@ypios.fr",
    image: `${site}/icon.png`,
    logo: `${site}/icon.png`,
    areaServed: "Île-de-France",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    sameAs: [] as string[],
  };

  return (
    <Script
      id="jsonld-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}