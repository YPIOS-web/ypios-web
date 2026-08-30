import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez des interventions réelles YPIOS en climatisation et ventilation à Melun, Osny, Paris, Orly, La Défense et Saint-Quentin-en-Yvelines.",
  alternates: { canonical: "/realisations" },
};

export default function Page() {
  return (
    <main id="contenu" className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/chantier/orly-local-cta.webp"
            alt="Local CTA neuf réalisé par YPIOS à l’aéroport d’Orly"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.96)_0%,rgba(13,27,61,0.76)_52%,rgba(13,27,61,0.34)_100%)]" />
        </div>
        <div className="ypios-container relative flex min-h-[520px] items-end py-16 sm:min-h-[560px] sm:py-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">Réalisations YPIOS</span>
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] sm:text-6xl">Le terrain comme preuve.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              Une sélection de chantiers YPIOS photographiés dans leur configuration réelle.
              Les images sont uniquement cadrées et optimisées pour le Web.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Carnet de réalisations</span>
            <h2 className="ypios-heading mt-4 text-4xl font-bold sm:text-5xl">
              Des installations identifiées, sans mise en scène.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Chaque opération est présentée avec les équipements, réseaux et contraintes réellement rencontrés sur site.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(13,27,61,0.06)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1B3D]/70 to-transparent px-6 pb-5 pt-16 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8BE4F2]">{project.category}</span>
                  </div>
                </div>

                {project.images.length > 1 ? (
                  <div className="grid grid-cols-2 gap-1 border-b border-slate-200 bg-slate-100">
                    {project.images.slice(1, 3).map((image) => (
                      <div key={image.src} className="relative aspect-[16/7] overflow-hidden bg-slate-200">
                        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.11em]">
                    <span className="text-[#FF7A00]">{project.site}</span>
                    <span className="text-slate-300" aria-hidden="true">•</span>
                    <span className="text-slate-500">{project.location}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0D1B3D]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container rounded-[28px] bg-[#0D1B3D] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Un cas à étudier ?</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Présentez-nous votre installation et ses contraintes.</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Plans, photos, rapports de contrôle ou simple description du problème : nous pouvons partir de l’existant.
            </p>
          </div>
          <Link href="/contact" className="ypios-button-primary mt-7 shrink-0 lg:mt-0">Nous contacter →</Link>
        </div>
      </section>
    </main>
  );
}
