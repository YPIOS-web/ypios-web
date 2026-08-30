import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import services from "@/content/services";

export const metadata: Metadata = {
  title: "GTC / GTB",
  description: "Supervision, régulation et automatisme des bâtiments : diagnostic, intégration, mise en service et maintenance GTB/GTC.",
  alternates: { canonical: "/services/gtc-gtb" },
};

export default function Page() {
  const service = services["gtc-gtb"];
  return (
    <ServicePage
      content={{
        title: "GTC / GTB",
        subtitle: "Supervision, régulation et automatisme : diagnostic, intégration, corrections, mise en service et accompagnement à l’exploitation.",
        hero: { src: "/images/gtb-illustration.webp", alt: "Supervision et régulation GTB" },
        ...service,
      }}
    />
  );
}
