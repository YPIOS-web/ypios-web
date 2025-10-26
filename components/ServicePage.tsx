// components/ServicePage.tsx
"use client";

import Image from "next/image";

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
  faq: FAQ[];
};

export default function ServicePage({ content: c }: { content: ServiceContent }) {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO avec overlay bas-centre (même style que les autres pages) */}
      <section className="relative w-full">
        <div className="relative w-full h-[58vh] min-h-[420px] max-h-[720px]">
          <Image
            src={c.hero.src}
            alt={c.hero.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Légère ombre en bas pour la lisibilité, comme ailleurs */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />

          {/* Titre & sous-titre centrés en bas de l'image */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-4 pb-6 md:pb-8">
            <h1 className="text-white font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
              {c.title}
            </h1>
            {c.subtitle && (
              <p className="mt-2 text-white/95 text-sm md:text-base max-w-[90ch] drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                {c.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Prestations</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.prestationsGrouped.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl ring-1 ring-black/10 bg-white p-5"
            >
              <h3 className="font-semibold text-slate-900">{g.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {g.items.map((it, i) => (
                  <li key={i}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* En pratique */}
      {c.highlights?.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">En pratique</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl ring-1 ring-black/10 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">{h.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{h.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Références */}
      {c.references?.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Références</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.references.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl ring-1 ring-black/10 bg-white overflow-hidden"
              >
                <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="px-4 py-3 text-sm text-slate-700">{r.title}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}