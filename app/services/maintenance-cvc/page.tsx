import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maintenance CVC en Île-de-France",
  description:
    "Maintenance préventive, dépannage et remise en état des installations CVC des bâtiments tertiaires, ERP et sites industriels en Île-de-France.",
  alternates: { canonical: "/services/maintenance-cvc" },
  openGraph: {
    type: "website",
    title: "Maintenance CVC en Île-de-France",
    description:
      "Diagnostic, maintenance préventive, dépannage et remise en état des installations CVC des bâtiments professionnels.",
    url: "/services/maintenance-cvc",
    images: [
      {
        url: "/images/quatre-temps-apres.webp",
        alt: "Centrale de traitement d’air après intervention YPIOS",
      },
    ],
  },
};

const interventionTypes = [
  {
    number: "01",
    title: "Maintenance préventive",
    text: "Des visites planifiées pour contrôler l’état des équipements, réaliser les opérations d’entretien prévues et repérer les dérives avant qu’elles ne perturbent l’exploitation.",
    items: [
      "Contrôles visuels et fonctionnels",
      "Nettoyage et remplacement des consommables prévus",
      "Relevés utiles et vérification des réglages",
      "Compte rendu des anomalies observées",
    ],
  },
  {
    number: "02",
    title: "Maintenance corrective & dépannage",
    text: "Une recherche structurée de la cause du défaut avant réparation, remplacement d’un organe ou remise en service de l’installation.",
    items: [
      "Analyse des symptômes, défauts et alarmes",
      "Contrôles électriques, hydrauliques et aérauliques",
      "Réparation ou proposition de travaux correctifs",
      "Essais après intervention",
    ],
  },
  {
    number: "03",
    title: "Remise en état & fiabilisation",
    text: "Une intervention adaptée lorsque l’entretien courant ne suffit plus ou que l’installation présente plusieurs défauts, organes usés ou incohérences de fonctionnement.",
    items: [
      "Hiérarchisation des actions nécessaires",
      "Remplacement des éléments défectueux",
      "Reprise des réglages et de la régulation",
      "Vérification du fonctionnement d’ensemble",
    ],
  },
] as const;

const equipmentFamilies = [
  {
    title: "Ventilation & CTA",
    text: "Centrales de traitement d’air, ventilateurs, filtres, courroies, batteries, registres, gaines et organes associés.",
    href: "/services/ventilation",
  },
  {
    title: "Climatisation",
    text: "Systèmes VRV/DRV, splits, gainables, cassettes, unités extérieures, condensats et réseaux frigorifiques.",
    href: "/services/climatisation",
  },
  {
    title: "Hydraulique",
    text: "Pompes, vannes, filtres, échangeurs, réseaux, panoplies et équipements associés aux installations CVC.",
    href: "/services/plomberie",
  },
  {
    title: "Régulation & GTB/GTC",
    text: "Automates, sondes, actionneurs, consignes, horaires, historiques, communications et reports d’alarmes.",
    href: "/services/gtc-gtb",
  },
] as const;

const method = [
  {
    title: "État initial",
    text: "Inventaire du parc, documents disponibles, accès, état apparent et premiers contrôles de fonctionnement.",
  },
  {
    title: "Priorités",
    text: "Classement des anomalies selon leur impact sur le fonctionnement, la sécurité des équipements et la continuité d’exploitation.",
  },
  {
    title: "Plan de maintenance",
    text: "Définition du périmètre, des opérations prévues, des fréquences, des consommables et des conditions d’intervention.",
  },
  {
    title: "Suivi documenté",
    text: "Compte rendu après intervention, constats, actions réalisées et recommandations pour les suites à programmer.",
  },
] as const;

const faq = [
  {
    question: "Que comprend un contrat de maintenance CVC ?",
    answer:
      "Le contenu dépend du parc et des contraintes du bâtiment. Après l’état initial, le contrat précise les équipements concernés, les visites prévues, les contrôles et entretiens inclus, les consommables, les modalités de dépannage et le niveau de compte rendu attendu.",
  },
  {
    question: "Pouvez-vous reprendre une installation ancienne ou peu documentée ?",
    answer:
      "Oui. La première étape consiste alors à relever l’installation, rassembler les informations disponibles et établir un état des lieux. Les défauts et travaux nécessaires peuvent ensuite être hiérarchisés avant de mettre en place un suivi régulier.",
  },
  {
    question: "Intervenez-vous dans des bâtiments occupés ?",
    answer:
      "Oui. Les interventions sont préparées en tenant compte des accès, des horaires, de la présence des occupants et des contraintes de continuité de service. Les éventuels arrêts d’équipement sont définis avec l’exploitant avant intervention.",
  },
  {
    question: "La régulation et la GTB peuvent-elles être intégrées à la maintenance ?",
    answer:
      "Oui, selon le périmètre retenu. Le diagnostic peut inclure les sondes, actionneurs, automatismes, consignes, horaires, historiques, communications et alarmes liés aux installations CVC.",
  },
  {
    question: "Quels sont vos délais de dépannage ?",
    answer:
      "Les conditions de prise en charge sont définies selon la criticité des équipements, les horaires du site, les accès et le niveau de service retenu. YPIOS ne fixe pas un délai générique sans avoir préalablement étudié l’installation et les contraintes d’exploitation.",
  },
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer:
      "YPIOS étudie les demandes de maintenance CVC sur l’ensemble de l’Île-de-France, pour les bâtiments tertiaires, ERP, sites industriels et autres installations professionnelles.",
  },
] as const;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.ypios.fr/services/maintenance-cvc#service",
  name: "Maintenance CVC en Île-de-France",
  serviceType: "Maintenance préventive et corrective des installations CVC",
  url: "https://www.ypios.fr/services/maintenance-cvc",
  provider: { "@id": "https://www.ypios.fr/#organization" },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Île-de-France",
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Bâtiments tertiaires, ERP et sites industriels",
  },
};

export default function Page() {
  return (
    <main id="contenu" className="bg-white">
      <script
        id="jsonld-maintenance-cvc"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/quatre-temps-apres.webp"
            alt="Centrale de traitement d’air après une intervention YPIOS"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.98)_0%,rgba(13,27,61,0.88)_50%,rgba(13,27,61,0.42)_100%)]" />
        </div>

        <div className="ypios-container relative flex min-h-[620px] items-end py-16 sm:min-h-[660px] sm:py-20">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">
              Maintenance & exploitation
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Maintenance CVC des bâtiments professionnels en Île-de-France
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Diagnostic, entretien préventif, dépannage et remise en état des installations de
              climatisation, ventilation, hydraulique et régulation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="ypios-button-primary">
                Étudier votre installation →
              </Link>
              <a
                href="#perimetre"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/15"
              >
                Voir le périmètre
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/12 bg-[#0D1B3D]/80 backdrop-blur-md">
          <div className="ypios-container grid gap-px sm:grid-cols-3">
            {[
              ["Zone", "Toute l’Île-de-France"],
              ["Bâtiments", "Tertiaire · ERP · Industriel"],
              ["Approche", "Préventif · Correctif · Remise en état"],
            ].map(([label, value]) => (
              <div key={label} className="py-5 sm:px-6 first:pl-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/45">{label}</div>
                <div className="mt-1 text-sm font-semibold text-white/88">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start lg:gap-16">
          <div>
            <span className="ypios-kicker">Avant le contrat</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              Un périmètre construit à partir de l’installation réelle.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Un contrat utile commence par une lecture claire du parc : équipements présents,
                état apparent, historique connu, documentation, accès et contraintes d’exploitation.
              </p>
              <p>
                Cette étape permet de distinguer l’entretien courant des anomalies déjà présentes,
                puis de définir les opérations, fréquences et modalités de dépannage adaptées au site.
                Les travaux de remise en état peuvent ainsi être identifiés séparément et priorisés.
              </p>
            </div>
          </div>

          <aside className="rounded-[26px] border border-slate-200 bg-[#F6F8FB] p-7" aria-label="Éléments étudiés avant un contrat de maintenance">
            <h2 className="text-xl font-bold text-[#0D1B3D]">Les éléments étudiés</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              {[
                "Inventaire des équipements et documents disponibles",
                "État de fonctionnement et défauts déjà identifiés",
                "Criticité des installations pour l’exploitation",
                "Accès, horaires et conditions d’intervention",
                "Niveau de suivi et de compte rendu attendu",
              ].map((item) => (
                <li key={item} className="grid grid-cols-[12px_1fr] gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#00B7DB]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="perimetre" className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Périmètre d’intervention</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              Prévenir, diagnostiquer et remettre en service.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Les opérations sont définies selon les équipements, leur état et le niveau de service
              retenu. Les prestations incluses et les éventuelles exclusions sont précisées avant le démarrage.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {interventionTypes.map((type) => (
              <article key={type.number} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(13,27,61,0.05)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1B3D] text-xs font-bold text-white">
                  {type.number}
                </span>
                <h3 className="mt-5 text-xl font-bold text-[#0D1B3D]">{type.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{type.text}</p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-600">
                  {type.items.map((item) => (
                    <li key={item} className="grid grid-cols-[10px_1fr] gap-2.5">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#FF7A00]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Équipements concernés</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              Une lecture globale des installations CVC.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Une panne ou une dérive peut provenir de l’équipement, de ses réseaux, de son alimentation
              ou de sa régulation. Le diagnostic tient compte de ces interfaces.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {equipmentFamilies.map((equipment) => (
              <article key={equipment.title} className="rounded-[22px] border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-[#0D1B3D]">{equipment.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{equipment.text}</p>
                <Link
                  href={equipment.href}
                  className="mt-5 inline-flex text-sm font-bold text-[#007B9A] underline decoration-[#00B7DB] decoration-2 underline-offset-4"
                >
                  Voir cette expertise →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D1B3D] py-16 text-white sm:py-20">
        <div className="ypios-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Preuve terrain</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Reprendre une installation avant de la fiabiliser.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/72">
                Lorsque l’état initial l’exige, la maintenance commence par une remise en état. Cette
                intervention sur une CTA existante illustre le passage d’un équipement ancien à une
                installation reprise, raccordée et prête à être suivie dans de meilleures conditions.
              </p>
              <Link href="/realisations" className="mt-7 inline-flex font-bold text-[#FF9B3D] hover:text-[#FFB56B]">
                Découvrir les réalisations YPIOS →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.05]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/quatre-temps-avant.webp"
                    alt="Centrale de traitement d’air existante avant intervention"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm font-semibold text-white/75">Avant intervention</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.05]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/quatre-temps-apres.webp"
                    alt="Centrale de traitement d’air après intervention YPIOS"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm font-semibold text-white/75">Après intervention</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Méthode YPIOS</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              Un suivi lisible pour l’exploitant.
            </h2>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((step, index) => (
              <li key={step.title} className="rounded-[22px] border border-slate-200 bg-white p-6">
                <span className="text-sm font-bold text-[#FF7A00]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold text-[#0D1B3D]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div>
            <span className="ypios-kicker">Questions fréquentes</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              Préparer une demande de maintenance CVC.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Un inventaire, quelques photographies, les derniers rapports disponibles et la description
              des problèmes rencontrés permettent déjà de cadrer un premier échange.
            </p>
          </div>

          <div className="space-y-3">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-[18px] border border-slate-200 bg-white px-5 py-4 open:shadow-[0_16px_40px_rgba(13,27,61,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold leading-6 text-[#0D1B3D] marker:hidden">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl font-normal text-[#007B9A] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="ypios-container rounded-[28px] bg-[#0D1B3D] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Votre parc CVC</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Une installation à maintenir ou à reprendre ?</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Transmettez les équipements concernés, les contraintes du site et les documents disponibles.
            </p>
          </div>
          <Link href="/contact" className="ypios-button-primary mt-7 shrink-0 lg:mt-0">
            Demander une première étude →
          </Link>
        </div>
      </section>
    </main>
  );
}
