import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Plomberie tertiaire en Île-de-France",
  description:
    "Plomberie technique et tertiaire : réseaux EF/ECS, évacuations, chaufferies, sanitaires, maintenance et dépannage dans toute l’Île-de-France.",
  alternates: { canonical: "/services/plomberie" },
};

export default function Page() {
  const service = services.plomberie;
  return (
    <ServicePage
      content={{
        title: "Plomberie tertiaire",
        subtitle:
          "Réseaux, panoplies, chaufferies, sanitaires et équipements hydrauliques : travaux, remise en état, maintenance et dépannage.",
        hero: { src: "/images/plomberie-technique.webp", alt: "Panoplies et réseaux de plomberie technique" },
        ...service,
      }}
    />
  );
}
