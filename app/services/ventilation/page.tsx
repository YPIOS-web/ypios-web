import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Ventilation",
  description: "CTA, réseaux aérauliques, désenfumage, équilibrage, régulation et maintenance des installations de ventilation.",
  alternates: { canonical: "/services/ventilation" },
};

export default function Page() {
  const service = services.ventilation;
  return (
    <ServicePage
      content={{
        title: "Ventilation",
        subtitle: "CTA, réseaux aérauliques, désenfumage et équilibrage : conception, travaux, mise au point et maintenance.",
        hero: {
          src: "/images/chantier/emmaus-reseaux-superposes.webp",
          alt: "Vue générale de la CTA toiture et de son supportage réalisés par YPIOS pour Emmaüs à Osny",
        },
        ...service,
      }}
    />
  );
}
