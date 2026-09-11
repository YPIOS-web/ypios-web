import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Climatisation VRV/DRV en Île-de-France",
  description:
    "YPIOS étudie, installe, maintient et dépanne les systèmes de climatisation VRV/DRV, splits et gainables des bâtiments tertiaires en Île-de-France.",
  alternates: { canonical: "/services/climatisation" },
};

export default function Page() {
  const service = services.climatisation;
  return (
    <ServicePage
      content={{
        title: "Climatisation VRV/DRV tertiaire",
        subtitle:
          "Étude, installation, mise en service, maintenance et dépannage des systèmes de climatisation pour les bâtiments professionnels.",
        hero: {
          src: "/images/chantier/damae-cassette.webp",
          alt: "Cassette de climatisation et réseaux apparents réalisés par YPIOS chez Damae à Paris 13",
        },
        ...service,
      }}
    />
  );
}
