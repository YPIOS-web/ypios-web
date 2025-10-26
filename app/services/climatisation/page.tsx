// app/services/climatisation/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Climatisation — YPIOS Énergie",
  description:
    "VRV/DRV & splits — bureaux, magasins et résidentiel. Études, pose, mise en service et maintenance.",
};

/* ----------------------------- Bandeau ----------------------------- */
const IMG_BANNER = "/images/service-clim-1024.png";

/* --------------------------- Prestations --------------------------- */
const PRESTATIONS: { title: string; points: string[] }[] = [
  {
    title: "Études & bilan de charge",
    points: [
      "Relevés, bilans thermiques & acoustiques",
      "Implantation des UI/UE (esthétique & accès)",
      "Sélection des équipements et variantes",
    ],
  },
  {
    title: "Installation VRV/DRV & splits",
    points: [
      "Pose UI/UE et supports",
      "Condensats, évacuations, calorifuge",
      "Percements, scellements & finitions",
    ],
  },
  {
    title: "Réseaux frigorifiques",
    points: [
      "Brasage/sertissage, épreuves d’étanchéité",
      "Tirage au vide, appoint & contrôle de charge",
      "PV et traçabilité des fluides",
    ],
  },
  {
    title: "Mise en service & conformité",
    points: [
      "Paramétrages constructeurs & optimisation",
      "Contrôles électriques, essais fonctionnels",
      "PV de mise en service, DOE",
    ],
  },
  {
    title: "Régulation/GTB & supervision",
    points: [
      "Scénarios horaires, reports d’alarmes",
      "Intégration GTB, télémaintenance",
      "Tableaux de bord & historiques",
    ],
  },
  {
    title: "Maintenance & dépannage",
    points: [
      "Nettoyage batteries/condenseurs, filtres",
      "Recherche pannes (cartes, détendeurs, sondes)",
      "Contrats adaptés à vos sites",
    ],
  },
];

/* ---------------------------- Références --------------------------- */
const REFS = [
  {
    src: "/images/Climatisation%20mural%20bureau.png",
    alt: "Climatisation murale en bureau",
    title: "Bureau — Climatisation murale",
  },
  {
    src: "/images/Climatisation%20plafonniere%20bureau%202.png",
    alt: "Climatisation plafonniers en open space",
    title: "Bureaux — Plafonniers",
  },
  {
    src: "/images/Climatisation%20plafonniere%20bureau.png",
    alt: "Climatisation plafonniers en bureaux",
    title: "Bureaux — Plafonniers",
  },
  {
    src: IMG_BANNER,
    alt: "Climatisation tertiaire — visuel",
    title: "Bureau — Paris centre",
  },
];

export default function ClimatisationPage() {
  return (
    <main id="contenu" className="min-h-screen bg-slate-50">
      {/* ===================== Bandeau plein écran ===================== */}
      <section className="relative w-full">
        <div className="relative h-[52vh] min-h-[420px] max-h-[680px]">
          <Image
            src={IMG_BANNER}
            alt="Bandeau — Climatisation"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-[12%] px-4 text-center">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl drop-shadow">
              Climatisation
            </h1>
            <p className="mt-2 text-white/90 max-w-[90ch] mx-auto text-sm sm:text-base">
              VRV/DRV &amp; splits — bureaux, magasins et résidentiel. Études, pose, mise en
              service et maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Prestations (rétabli) ===================== */}
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

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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