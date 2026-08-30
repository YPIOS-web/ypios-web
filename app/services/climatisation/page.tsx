import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Climatisation",
  description: "Études, installation, mise en service, maintenance et dépannage de solutions VRV/DRV et splits en Île-de-France.",
  alternates: { canonical: "/services/climatisation" },
};

export default function Page() {
  const service = services.climatisation;
  return (
    <ServicePage
      content={{
        title: "Climatisation",
        subtitle: "VRV/DRV, splits et systèmes tertiaires : étude, installation, mise en service, maintenance et dépannage.",
        hero: {
          src: "/images/chantier/damae-cassette.webp",
          alt: "Cassette de climatisation et réseaux apparents réalisés par YPIOS chez Damae à Paris 13",
        },
        ...service,
      }}
    />
  );
}
