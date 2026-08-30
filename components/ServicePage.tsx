import Image from "next/image";
import Link from "next/link";

export type PrestationsGroup = { title: string; items: string[] };
export type Highlight = { title: string; text: string };
export type Reference = { title: string; image: string };
export type FAQ = { q: string; a: string };

export type ServiceContent = {
  title: string;
  subtitle?: string;
  hero: { src: string; alt: string };
  prestationsGrouped: PrestationsGroup[];
  highlights: Highlight[];
  references: Reference[];
  faq?: FAQ[];
};

export default function ServicePage({ content: c }: { content: ServiceContent }) {
  return (
    <main id="contenu" className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image src={c.hero.src} alt={c.hero.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.94)_0%,rgba(13,27,61,0.72)_48%,rgba(13,27,61,0.28)_100%)]" />
        </div>
        <div className="ypios-container relative flex min-h-[520px] items-end py-16 sm:min-h-[560px] sm:py-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">Expertise YPIOS</span>
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] sm:text-6xl">{c.title}</h1>
            {c.subtitle ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">{c.subtitle}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="ypios-button-primary">Parler de votre besoin →</Link>
              <Link
                href="/realisations"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/15"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Prestations</span>
            <h2 className="ypios-heading mt-4 text-4xl font-bold sm:text-5xl">
              Une intervention pensée dans son ensemble.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {c.prestationsGrouped.map((group, index) => (
              <article key={group.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(13,27,61,0.05)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B3D] text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-[#0D1B3D]">{group.title}</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  {group.items.map((item) => (
                    <li key={item} className="grid grid-cols-[10px_1fr] gap-2.5">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#00B7DB]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {c.highlights?.length ? (
        <section className="bg-[#F6F8FB] py-16 sm:py-20">
          <div className="ypios-container">
            <div className="max-w-3xl">
              <span className="ypios-kicker">En pratique</span>
              <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">Les points que nous intégrons à l’intervention.</h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.highlights.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold text-[#0D1B3D]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {c.references?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="ypios-container">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="ypios-kicker">Réalisations</span>
                <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">Quelques interventions représentatives.</h2>
              </div>
              <Link href="/realisations" className="text-sm font-bold text-[#0D1B3D]">Toutes les réalisations →</Link>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {c.references.slice(0, 3).map((reference) => (
                <figure key={`${reference.title}-${reference.image}`} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image src={reference.image} alt={reference.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <figcaption className="px-5 py-4 text-sm font-semibold text-[#0D1B3D]">{reference.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container rounded-[28px] bg-[#0D1B3D] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Votre installation</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Vous avez un projet ou un problème technique à résoudre ?</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">Présentez-nous le contexte, les contraintes du site et le niveau d’urgence.</p>
          </div>
          <Link href="/contact" className="ypios-button-primary mt-7 shrink-0 lg:mt-0">Nous contacter →</Link>
        </div>
      </section>
    </main>
  );
}
