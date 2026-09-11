import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Ventilation & CTA en Île-de-France",
  description:
    "YPIOS réalise et maintient vos CTA, réseaux aérauliques, équipements de désenfumage et réglages de ventilation partout en Île-de-France.",
  alternates: { canonical: "/services/ventilation" },
};

export default function Page() {
  const service = services.ventilation;
  return (
    <ServicePage
      content={{
        title: "Ventilation & traitement d’air",
        subtitle:
          "Centrales de traitement d’air, réseaux aérauliques, désenfumage et équilibrage : étude, travaux, mise au point et maintenance.",
        hero: {
          src: "/images/chantier/emmaus-reseaux-superposes.webp",
          alt: "Vue générale de la CTA toiture et de son supportage réalisés par YPIOS pour Emmaüs à Osny",
        },
        ...service,
      }}
    />
  );
}
