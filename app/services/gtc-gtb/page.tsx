// app/services/gtc-gtb/page.tsx
import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "GTC/GTB — YPIOS Énergie",
  description:
    "Supervision, régulation et automatisme des bâtiments : études, intégration GTB/GTC, mise en service et maintenance.",
};

/* ------------------------------ HERO ------------------------------ */
const HERO = {
  src: "/images/illustration GTB 2.png",
  alt: "GTC/GTB — illustration",
};

/* --------------------------- PRESTATIONS -------------------------- */
const PRESTATIONS_GROUPED = [
  {
    title: "Supervision & énergie",
    items: [
      "Synoptiques, alarmes utiles & accès web multi-sites",
      "Historisation, tendances et détection des dérives",
      "Tableaux de bord énergie & suivi des consommations",
    ],
  },
  {
    title: "Pilotage CVC & éclairage",
    items: [
      "Automates (CTA, PAC, chaudières), boucles PID & consignes",
      "Équilibrage air/eau, confort et sobriété",
      "Éclairage selon occupation & lumière du jour",
    ],
  },
  {
    title: "Maintenance & continuité",
    items: [
      "Paramétrage, recettes & essais fonctionnels",
      "Surveillance à distance & télémaintenance",
      "Optimisation continue et formation des équipes",
    ],
  },
  {
    title: "Conformité & intégrations",
    items: [
      "Comptages élec/eau/chaleur/froid — Modbus, BACnet, M-Bus",
      "Intégrations : stores/BSO, SSI, contrôle d’accès, vidéo",
      "DOE & schémas mis à jour en fin d’affaire",
    ],
  },
];

/* --------------------------- EN PRATIQUE -------------------------- */
const HIGHLIGHTS = [
  { title: "GTB vs GTC", text: "GTB = multi-lots/bâtiment(s) ; GTC = sous-ensemble (ex. CVC)." },
  { title: "Protocoles", text: "BACnet, Modbus, KNX, M-Bus, LON" },
  { title: "Marques GTB", text: "Siemens, Schneider, WIT, TREND, Sauter…" },
  { title: "Cybersécurité", text: "Segmentation réseau, comptes & sauvegardes" },
  { title: "Sites occupés", text: "Interventions planifiées et discrètes" },
  { title: "Support", text: "Télémaintenance & astreinte selon contrat" },
];

/* ---------------------------- RÉFÉRENCES -------------------------- */
const REFERENCES = [
  { title: "Armoire GTB industrielle", image: "/images/Armoire GTB industrielle.png" },
];

/* ------------------------------- PAGE ----------------------------- */
export default function Page() {
  return (
    <ServicePage
      content={{
        title: "GTC/GTB",
        subtitle: "Supervision, régulation et automatisme des bâtiments",
        hero: HERO,
        prestationsGrouped: PRESTATIONS_GROUPED,
        highlights: HIGHLIGHTS,
        references: REFERENCES,
        faq: [],
      }}
    />
  );
}