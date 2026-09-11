import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "GTC / GTB & régulation CVC en Île-de-France",
  description:
    "YPIOS diagnostique, intègre et maintient les systèmes GTC/GTB et la régulation CVC des bâtiments tertiaires en Île-de-France.",
  alternates: { canonical: "/services/gtc-gtb" },
};

export default function Page() {
  const service = services["gtc-gtb"];
  return (
    <ServicePage
      content={{
        title: "GTC / GTB & régulation CVC",
        subtitle:
          "Supervision, automatismes et régulation : diagnostic, intégration, corrections, mise en service et accompagnement à l’exploitation.",
        hero: { src: "/images/gtb-illustration.webp", alt: "Supervision et régulation GTB" },
        ...service,
      }}
    />
  );
}
