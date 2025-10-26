// app/not-found.tsx
import Image from "next/image";
import Link from "next/link";

const IMG_HERO =
  "/images/Local%20technique%20CVC%20%E2%80%94%20CTA,%20panoplie%20%26%20gaines.png";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative w-full h-[42vh] min-h-[320px] max-h-[520px]">
        <Image src={IMG_HERO} alt="YPIOS — visuel" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <div className="rounded-full bg-black/30 backdrop-blur-sm px-6 py-3 ring-1 ring-white/15">
            <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
              Page introuvable
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-slate-700">
          Oups, la page demandée n’existe pas. Utilisez le menu, ou revenez à l’accueil.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-block rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800"
          >
            Revenir à l’accueil
          </Link>
        </div>
      </section>
    </main>
  );
}