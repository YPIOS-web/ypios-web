// app/services/plomberie/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Plomberie — YPIOS Énergie",
  description:
    "Études, réseaux EF/ECS, chaufferies & sous-stations, sanitaires, maintenance et régulation associée.",
};

/* ----------------------------- Bandeau ----------------------------- */
const IMG_BANNER = "/images/hero-plomberie-1792x1024.png";

/* --------------------------- Prestations --------------------------- */
const PRESTATIONS: { title: string; points: string[] }[] = [
  {
    title: "Études & dimensionnement",
    points: [
      "Schémas, diamètres et pertes de charge",
      "Sélection des organes de sécurité",
      "Notes de calcul et DOE",
    ],
  },
  {
    title: "Réseaux (tous matériaux)",
    points: [
      "Cuivre, acier, inox, multicouche, PEHD",
      "Distribution EF/ECS & bouclage",
      "Robinetterie, disconnecteurs, potabilisation",
    ],
  },
  {
    title: "Chaufferies & sous-stations",
    points: [
      "Montage panoplies & équipements",
      "Mise en service, soupapes, vases d’expansion",
      "Régulation et sécurité",
    ],
  },
  {
    title: "Sanitaires & évacuations",
    points: [
      "Appareils, siphons, chasses, douches",
      "PVC/fonte, insonorisation",
    ],
  },
  {
    title: "Maintenance & dépannage",
    points: [
      "Fuites, désordres, remplacement d’organes",
      "Mesures, équilibrage, réglages",
    ],
  },
  {
    title: "Régulation associée",
    points: [
      "Sondes, circulateurs, vannes de mélange",
      "Automates et asservissements",
    ],
  },
];

/* ---------------------------- Références --------------------------- */
const REFS = [
  {
    // point validé précédemment : cette vignette reprend l’image et le titre ci-dessous
    src: "/images/Chaufferie%20maison%20neuve.png",
    alt: "Chaufferie d'une maison neuve",
    title: "Chaufferie maison neuve",
  },
  {
    // DEMANDE : Panoplies techniques → hero-plomberie-1792x1024.png
    src: "/images/hero-plomberie-1792x1024.png",
    alt: "Panoplies techniques plomberie",
    title: "Panoplies techniques",
  },
  {
    // DEMANDE : Sanitaires & colonnes → Sanitaires.png et titre “Sanitaires”
    src: "/images/Sanitaires.png",
    alt: "Sanitaires et colonnes",
    title: "Sanitaires",
  },
];

export default function PlomberiePage() {
  return (
    <main id="contenu" className="min-h-screen bg-slate-50">
      {/* ===================== Bandeau plein écran ===================== */}
      <section className="relative w-full">
        <div className="relative h-[52vh] min-h-[420px] max-h-[680px]">
          <Image
            src={IMG_BANNER}
            alt="Bandeau — Plomberie"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-[12%] px-4 text-center">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl drop-shadow">
              Plomberie
            </h1>
            <p className="mt-2 text-white/90 max-w-[90ch] mx-auto text-sm sm:text-base">
              Réseaux EF/ECS, chaufferies &amp; sous-stations, sanitaires, maintenance et
              régulation associée.
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