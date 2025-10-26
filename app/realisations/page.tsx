// app/realisations/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import services from "@/content/services"; // <-- on utilise exactement les mêmes données

export const metadata: Metadata = {
  title: "Réalisations — YPIOS Énergie",
  description:
    "Sélection de réalisations en ventilation, climatisation, plomberie et GTC/GTB.",
};

type Reference = { title: string; image: string };
type ServiceEntry = { references?: Reference[] };

const ORDER = ["climatisation", "ventilation", "plomberie", "gtc-gtb"] as const;
const LABELS: Record<(typeof ORDER)[number], string> = {
  climatisation: "Climatisation",
  ventilation: "Ventilation",
  plomberie: "Plomberie",
  "gtc-gtb": "GTC/GTB & régulation",
};

export default function Page() {
  // On lit les références *telles quelles* depuis content/services.ts
  const store = services as Record<string, ServiceEntry>;
  const buckets = ORDER.map((key) => {
    const refs = (store[key]?.references ?? []) as Reference[];
    return { key, title: LABELS[key], refs };
  }).filter((b) => b.refs.length > 0);

  return (
    <main>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Réalisations
        </h1>

        {buckets.map((b) => (
          <div key={b.key} className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">{b.title}</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {b.refs.map((r, idx) => (
                <figure
                  key={`${b.key}-${idx}-${r.title}`}
                  className="rounded-2xl ring-1 ring-black/10 bg-white overflow-hidden"
                >
                  <div className="relative aspect-[16/10]">
                    {/* IMPORTANT : on passe le chemin tel qu’il est dans content/services.ts */}
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={idx < 3}
                    />
                  </div>
                  <figcaption className="p-3 text-sm text-slate-700">
                    {r.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}