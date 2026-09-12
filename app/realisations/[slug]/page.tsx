import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { detailedProjects, getDetailedProject } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return detailedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getDetailedProject(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.details.seoTitle,
    description: project.details.seoDescription,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.details.seoTitle,
      description: project.details.seoDescription,
      url: `/realisations/${project.slug}`,
      images: [{ url: project.images[0].src, alt: project.images[0].alt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getDetailedProject(slug);

  if (!project) {
    notFound();
  }

  const { details } = project;
  const pageUrl = `https://www.ypios.fr/realisations/${project.slug}`;
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: details.h1,
        description: details.seoDescription,
        image: project.images.map((image) => `https://www.ypios.fr${image.src}`),
        dateModified: `${details.lastModified}T00:00:00.000Z`,
        author: { "@id": "https://www.ypios.fr/#organization" },
        publisher: { "@id": "https://www.ypios.fr/#organization" },
        mainEntityOfPage: pageUrl,
        articleSection: project.category,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.ypios.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Réalisations",
            item: "https://www.ypios.fr/realisations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.site,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main id="contenu" className="bg-white">
      <script
        id={`jsonld-realisation-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.97)_0%,rgba(13,27,61,0.82)_52%,rgba(13,27,61,0.42)_100%)]" />
        </div>

        <div className="ypios-container relative flex min-h-[560px] items-end py-14 sm:min-h-[620px] sm:py-20">
          <div className="max-w-4xl">
            <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
              <Link href="/realisations" className="underline decoration-white/40 underline-offset-4 hover:text-white">
                Réalisations
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{project.site}</span>
            </nav>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">
              {project.category} · {project.location}
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {details.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-lg">{details.lead}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16">
          <article>
            <span className="ypios-kicker">Le besoin</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              {details.contextHeading}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              {details.context.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-[24px] border border-slate-200 bg-[#F6F8FB] p-6 sm:p-7" aria-label="Informations sur la réalisation">
            <h2 className="text-lg font-bold text-[#0D1B3D]">Repères du chantier</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Site</dt>
                <dd className="mt-1 font-bold text-[#0D1B3D]">{project.site}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Localisation</dt>
                <dd className="mt-1 font-bold text-[#0D1B3D]">{project.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Domaine</dt>
                <dd className="mt-1 font-bold text-[#0D1B3D]">{project.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Configuration</dt>
                <dd className="mt-1 font-bold text-[#0D1B3D]">{details.configuration}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Intervention YPIOS</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              {details.interventionHeading}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {details.interventionLead}
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {details.intervention.map((item, index) => (
              <li key={item} className="rounded-[22px] border border-slate-200 bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B3D] text-xs font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#0D1B3D]">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="ypios-container">
          <div className="max-w-3xl">
            <span className="ypios-kicker">Détails de l’installation</span>
            <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">
              {details.galleryHeading}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {project.images.map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <figcaption className="bg-white px-5 py-4 text-sm leading-6 text-slate-600">{image.alt}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {details.technicalPoints.map((point) => (
              <article key={point.title} className="rounded-[22px] border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-[#0D1B3D]">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className="ypios-container max-w-4xl">
          <span className="ypios-kicker">Résultat observable</span>
          <h2 className="ypios-heading mt-4 text-3xl font-bold sm:text-4xl">{details.resultHeading}</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">{details.result}</p>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container rounded-[28px] bg-[#0D1B3D] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#57D4EA]">Votre installation</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">{details.ctaHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {details.ctaText}
            </p>
          </div>
          <div className="mt-7 flex shrink-0 flex-wrap gap-3 lg:mt-0">
            {details.serviceLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                Voir {service.label}
              </Link>
            ))}
            <Link href="/contact" className="ypios-button-primary">Nous contacter →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
