import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Climatisation",
    text: "VRV/DRV, splits, réseaux frigorifiques, mise en service et maintenance.",
    href: "/services/climatisation",
    image: "/images/chantier/damae-cassette.webp",
    accent: "#FF7A00",
  },
  {
    title: "Ventilation",
    text: "CTA, réseaux aérauliques, désenfumage, équilibrage et régulation.",
    href: "/services/ventilation",
    image: "/images/chantier/emmaus-reseaux-superposes.webp",
    accent: "#00B7DB",
  },
  {
    title: "Plomberie",
    text: "Réseaux, panoplies, chaufferies, sanitaires et maintenance technique.",
    href: "/services/plomberie",
    image: "/images/plomberie-technique.webp",
    accent: "#0D1B3D",
  },
  {
    title: "GTC / GTB",
    text: "Supervision, régulation, diagnostics, corrections et optimisation des installations.",
    href: "/services/gtc-gtb",
    image: "/images/gtb-regulation.webp",
    accent: "#007DB8",
  },
];

const partners = [
  ["Actemium", "actemium.png"],
  ["ADP Groupe", "adp-groupe.png"],
  ["ENGIE Solutions", "engie-solutions.png"],
  ["ETT", "ett.png"],
  ["SPIE Facilities", "spie-facilities.png"],
  ["Unibail-Westfield", "unibail-westfield.png"],
] as const;

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function HomePage() {
  return (
    <main id="contenu">
      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/chantier/saint-quentin-hero.webp"
            alt="CTA VIM CADO et réseaux circulaires installés par YPIOS à Saint-Quentin-en-Yvelines"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.96)_0%,rgba(13,27,61,0.84)_43%,rgba(13,27,61,0.42)_75%,rgba(13,27,61,0.26)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,27,61,0.45)_0%,transparent_45%)]" />
        </div>

        <div className="ypios-container relative flex min-h-[660px] items-center py-20 sm:min-h-[700px] lg:min-h-[720px]">
          <div className="max-w-3xl py-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#57D4EA]">
              CVC · Plomberie · GTB
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">
              Votre problème.<br />Notre solution.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              YPIOS accompagne vos installations techniques de l’étude à la remise en service :
              climatisation, ventilation, plomberie, régulation et GTB.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="ypios-button-primary">
                Parler de votre projet <Arrow />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/16"
              >
                Voir nos réalisations <Arrow />
              </Link>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
              Réalisation YPIOS · Saint-Quentin-en-Yvelines
            </p>
          </div>
        </div>

        <div className="relative border-t border-white/12 bg-[#0D1B3D]/75 backdrop-blur-md">
          <div className="ypios-container grid gap-px sm:grid-cols-3">
            {[
              ["Zone d’intervention", "Île-de-France"],
              ["Secteurs", "Tertiaire · Industriel · Résidentiel"],
              ["Interventions", "Études · Travaux · Maintenance"],
            ].map(([label, value]) => (
              <div key={label} className="py-5 sm:px-6 first:pl-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/45">{label}</div>
                <div className="mt-1 text-sm font-semibold text-white/88">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24" id="expertises">
        <div className="ypios-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="ypios-kicker">Nos expertises</span>
              <h2 className="ypios-heading mt-4 text-4xl font-bold sm:text-5xl">
                Un interlocuteur pour vos installations techniques.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
              Du diagnostic à l’exécution, nous coordonnons les interventions avec une lecture
              globale des installations pour limiter les interfaces, sécuriser les choix et remettre
              les équipements en service dans de bonnes conditions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Link
                href={service.href}
                key={service.title}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(13,27,61,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3D]/35 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-4 h-1 w-12 rounded-full" style={{ background: service.accent }} />
                  <h3 className="text-xl font-bold text-[#0D1B3D]">{service.title}</h3>
                  <p className="mt-2 min-h-[66px] text-sm leading-6 text-slate-600">{service.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0D1B3D]">
                    Découvrir <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-20 sm:py-24">
        <div className="ypios-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0D1B3D] shadow-[0_30px_80px_rgba(13,27,61,0.16)]">
            <div className="relative aspect-[5/4]">
              <Image
                src="/images/chantier/orly-local-cta.webp"
                alt="Local CTA neuf réalisé par YPIOS à l’aéroport d’Orly"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3D]/55 via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <span className="ypios-kicker">Notre approche</span>
            <h2 className="ypios-heading mt-4 text-4xl font-bold sm:text-5xl">
              Comprendre avant d’intervenir.
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Une installation technique ne se résume pas au remplacement d’un équipement.
              Nous cherchons l’origine du problème, évaluons les interfaces et hiérarchisons les
              actions avant de proposer une solution adaptée au site et à son exploitation.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                ["01", "Diagnostic clair", "Relevés, contrôles, causes probables et priorités d’action."],
                ["02", "Solution maîtrisée", "Chiffrage lisible, préparation, coordination et exécution."],
                ["03", "Remise en service", "Essais, réglages, contrôles et traçabilité de l’intervention."],
              ].map(([num, title, text]) => (
                <div key={num} className="grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-sm font-bold text-[#FF7A00]">{num}</div>
                  <div>
                    <h3 className="font-bold text-[#0D1B3D]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Une expertise de terrain</span>
            <h2 className="ypios-heading mt-4 text-4xl font-bold sm:text-5xl">
              Diagnostiquer. Reprendre. Fiabiliser.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Nous intervenons aussi sur des installations existantes présentant des défauts,
              des non-conformités ou des performances insuffisantes, avec une logique simple :
              comprendre l’existant et remettre l’installation dans un état maîtrisé.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-[26px] border border-slate-200 bg-white">
              <div className="relative aspect-video">
                <Image
                  src="/images/quatre-temps-avant.webp"
                  alt="CTA avant intervention"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#0D1B3D]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                  Avant intervention
                </figcaption>
              </div>
            </figure>
            <figure className="overflow-hidden rounded-[26px] border border-slate-200 bg-white">
              <div className="relative aspect-video">
                <Image
                  src="/images/quatre-temps-apres.webp"
                  alt="CTA après intervention"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#00A7C9]/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                  Après intervention
                </figcaption>
              </div>
            </figure>
          </div>

          <div className="mt-8 flex justify-start">
            <Link href="/realisations" className="ypios-button-secondary">
              Découvrir nos réalisations <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0D1B3D] py-20 text-white sm:py-24">
        <div className="ypios-container grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/12 bg-white/[0.06] p-7 sm:p-9">
            <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/images/chantier/quatre-temps-carrier.webp"
                alt="CTA Carrier existante au centre commercial Les Quatre Temps"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF9B3D]">Réactivité</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Dépannage & remise en service</h2>
            <p className="mt-4 text-sm leading-6 text-white/72">
              Recherche de panne, mise en sécurité, remplacement des organes défectueux,
              essais et remise en service sous contrôle.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/[0.06] p-7 sm:p-9">
            <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/images/chantier/orly-cta-detail.webp"
                alt="CTA et réseaux calorifugés dans le local technique de l’aéroport d’Orly"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#57D4EA]">Optimisation</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Conseil & pilotage technique</h2>
            <p className="mt-4 text-sm leading-6 text-white/72">
              Régulation, équilibrage, analyse des dérives, hiérarchisation des actions et
              accompagnement à l’exploitation des installations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="ypios-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ypios-kicker">Références</span>
              <h2 className="ypios-heading mt-3 text-3xl font-bold sm:text-4xl">Ils nous font confiance</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Des environnements techniques exigeants, en exploitation comme en travaux.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map(([name, file]) => (
              <div
                key={name}
                className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5"
              >
                <div className="relative h-11 w-full">
                  <Image
                    src={`/partners/${file}`}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 12vw, (min-width: 640px) 26vw, 40vw"
                    className="object-contain grayscale-[20%]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container overflow-hidden rounded-[30px] bg-[#0D1B3D] px-7 py-10 text-white sm:px-12 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Votre projet</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Un besoin, un dysfonctionnement ou une installation à reprendre ?
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/72 sm:text-base">
              Décrivez-nous le contexte. Nous revenons vers vous avec une première lecture du besoin
              et la démarche adaptée.
            </p>
          </div>
          <div className="mt-7 shrink-0 lg:mt-0">
            <Link href="/contact" className="ypios-button-primary">
              Nous contacter <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
