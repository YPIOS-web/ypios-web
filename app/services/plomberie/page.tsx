import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "Plomberie",
  description: "Réseaux EF/ECS, panoplies, chaufferies, sanitaires, régulation associée, maintenance et dépannage.",
  alternates: { canonical: "/services/plomberie" },
};

export default function Page() {
  const service = services.plomberie;
  return (
    <ServicePage
      content={{
        title: "Plomberie",
        subtitle: "Réseaux, panoplies, chaufferies, sanitaires et équipements hydrauliques : réalisation, maintenance et dépannage.",
        hero: { src: "/images/plomberie-technique.webp", alt: "Panoplies et réseaux de plomberie technique" },
        ...service,
      }}
    />
  );
}
