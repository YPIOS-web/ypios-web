// app/services/ventilation/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ventilation — YPIOS Énergie",
  description:
    "Conception, installation et maintenance des réseaux de ventilation : CTA, réseaux aérauliques, désenfumage et équilibrage.",
};

/* ----------------------------- Bandeau ----------------------------- */
/** Visuel toit/CTA validé pour la ventilation */
const IMG_BANNER =
  "/images/CTA%2C%20ventilation%2C%20d%C3%A9senfumage%2C%20%C3%A9quilibrage..png";

/* --------------------------- Prestations --------------------------- */
const PRESTATIONS: { title: string; points: string[] }[] = [
  {
    title: "Études techniques & dimensionnement",
    points: [
      "Relevés, calculs de débits et sections",
      "Sélection CTA/ventilateurs, schémas aérauliques",
      "Notes de calculs et DOE",
    ],
  },
  {
    title: "Réseaux hydrauliques (tous matériaux)",
    points: [
      "Acier noir, galvanisé, inox, multicouche",
      "Départs/retours, supports, purge et vidange",
      "Raccordements batteries eau chaude/eau glacée",
    ],
  },
  {
    title: "Réseaux aérauliques",
    points: [
      "Gaines acier galvanisé / isolation / calorifuge",
      "Bouches, grilles, registres et pièges à son",
      "Essais d’étanchéité et mise au point",
    ],
  },
  {
    title: "CTA / Groupes froids & équipements",
    points: [
      "Pose, raccordements, essais fonctionnels",
      "Mise en service et réglages de consignes",
      "Traitement acoustique si requis",
    ],
  },
  {
    title: "Désenfumage",
    points: [
      "Moteurs, volets et clapets coupe-feu",
      "Coffrets de relayage et alimentations",
      "Essais réglementaires",
    ],
  },
  {
    title: "Régulation & asservissements",
    points: [
      "Armoires, capteurs/actionneurs, câblage",
      "Paramétrage, supervision & alarmes",
      "Rapports et recommandations",
    ],
  },
];

/* ---------------------------- Références --------------------------- */
const REFS = [
  {
    src: "/images/CTA%20La%20D%C3%A9fense.png", // demandé : utiliser cette photo
    alt: "CTA en local technique — La Défense",
    title: "CTA Local Technique",
  },
  {
    src: "/images/Ventilation%20toiture.png",
    alt: "Réseaux aérauliques en toiture",
    title: "Ventilation toiture",
  },
  {
    src: "/images/Ventilation%20local%20technique.png",
    alt: "Ventilation en local technique",
    title: "Ventilation local technique",
  },
];

export default function VentilationPage() {
  return (
    <main id="contenu" className="min-h-screen bg-slate-50">
      {/* ===================== Bandeau plein écran ===================== */}
      <section className="relative w-full">
        <div className="relative h-[52vh] min-h-[420px] max-h-[680px]">
          <Image
            src={IMG_BANNER}
            alt="Bandeau — Ventilation"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-[12%] px-4 text-center">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl drop-shadow">
              Ventilation
            </h1>
            <p className="mt-2 text-white/90 max-w-[90ch] mx-auto text-sm sm:text-base">
              Conception, installation et maintenance des réseaux de ventilation : CTA, réseaux
              aérauliques, désenfumage et équilibrage.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Prestations ===================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Prestations
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRESTATIONS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 h-full flex flex-col"
            >
              <h3 className="font-semibold text-slate-900">{b.title}</h3>
              <ul className="mt-3 text-sm text-slate-700 space-y-1">
                {b.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== Références ===================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Références
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REFS.map((r) => (
            <figure
              key={r.title}
              className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden h-full flex flex-col"
            >
              <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="p-4 text-sm font-medium text-slate-800">
                {r.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}