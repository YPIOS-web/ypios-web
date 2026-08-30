export default function JsonLd() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://ypios.fr").replace(/\/+$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site}/#organization`,
    name: "YPIOS",
    url: site,
    email: "contact@ypios.fr",
    logo: `${site}/brand/ypios-logo.svg`,
    image: `${site}/images/og-default.jpg`,
    areaServed: "Île-de-France",
    knowsAbout: ["Climatisation", "Ventilation", "Plomberie", "GTC", "GTB"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "2, rue des Hauts Sablons",
      postalCode: "91310",
      addressLocality: "Leuville-sur-Orge",
      addressCountry: "FR",
    },
  };

  return (
    <script
      id="jsonld-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
