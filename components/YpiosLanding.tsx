// components/YpiosLanding.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

/* ========= Chemins d'images ========= */
const IMG_HERO = "/images/Home2.png";
const IMG_LOGO = "/logo/Petit%20YPIOS.jpeg";

const IMG_SERVICE_VENTILATION =
  "/images/CTA%2C%20ventilation%2C%20d%C3%A9senfumage%2C%20%C3%A9quilibrage..png";
const IMG_SERVICE_PLOMBERIE = "/images/hero-plomberie-1792x1024.png";
const IMG_SERVICE_CLIM = "/images/service-clim-1024.png";
const IMG_SERVICE_REGUL = "/images/service-regulation-1024.png";

const IMG_CONSEIL = "/images/Conseil%20%26%20optimisation.png";
const IMG_DEPANNAGE = "/images/D%C3%A9pannage.png";

const YPIOS_BLUE = "#1b4d9b";

/* ===================== Slider (conservé) ===================== */
function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Avant",
  afterLabel = "Après",
  initial = 50,
  alt = "Comparatif avant/après",
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  initial?: number; // 0..100
  alt?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState(Math.min(100, Math.max(0, initial)));

  const start = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    setPos(Number(((x / r.width) * 100).toFixed(2)));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    start(e.clientX);
    const move = (ev: MouseEvent) => start(ev.clientX);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    start(e.touches[0].clientX);
    const move = (ev: TouchEvent) => start(ev.touches[0].clientX);
    const up = () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ring-1 ring-black/10 ${className}`}
      style={{ aspectRatio: "16 / 9" }}
      aria-label={alt}
    >
      <Image src={afterSrc} alt={`${alt} — après`} fill className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Image src={beforeSrc} alt={`${alt} — avant`} fill className="object-cover" />
      </div>
      <div
        className="absolute inset-y-0 cursor-col-resize"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        aria-hidden
      >
        <div className="relative h-full w-0.5 bg-white/85 shadow-[0_0_0_2px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            aria-label="Glisser pour comparer"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"
          >
            <span className="pointer-events-none block text-slate-500 leading-none">▮▮</span>
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded bg-black/55 px-2 py-1 text-xs font-medium text-white">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-3 bottom-3 rounded bg-black/55 px-2 py-1 text-xs font-medium text-white">
        {afterLabel}
      </div>
    </div>
  );
}

/* ===================== Cartes Service ===================== */
function ServiceCard({
  src,
  title,
  desc,
  href,
}: {
  src: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl ring-1 ring-black/10 bg-white overflow-hidden hover:shadow-lg transition h-full flex flex-col"
    >
      <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>
        <Image src={src} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </Link>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative w-full h-[58vh] min-h-[460px] max-h-[720px]">
        <Image
          src={IMG_HERO}
          alt="Accueil — YPIOS Énergie"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* halo discret */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: "62vw",
            maxWidth: 880,
            height: "62vw",
            maxHeight: 880,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.38) 40%, rgba(0,0,0,0.20) 62%, rgba(0,0,0,0) 78%)",
            filter: "blur(2px)",
          }}
        />

        {/* Contenu descendu pour ne pas chevaucher le header */}
        <div className="absolute inset-0 flex items-start justify-center text-center px-4">
          <div className="mt-20 md:mt-28">
            {/* LOGO + NOM : fond retiré, texte en blanc */}
            <div className="inline-flex items-center gap-4">
              <Image
                src={IMG_LOGO}
                alt="YPIOS"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-contain"
              />
              <span
                className="font-extrabold leading-none tracking-tight text-4xl md:text-5xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              >
                YPIOS Energie
              </span>
            </div>

            <h1
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white"
              style={{ textShadow: "0 3px 18px rgba(0,0,0,.45)" }}
            >
              Votre expert en
              <br />
              Climatisation, Ventilation et Plomberie
            </h1>

            <p className="mt-4 text-slate-50/95 text-[15px] sm:text-base leading-relaxed max-w-[80ch] mx-auto">
              Installation, entretien & maintenance pour <strong>tertiaire</strong> –{" "}
              <strong>industriel</strong> – <strong>résidentiel</strong>. <br />
              Pourquoi YPIOS ? Interlocuteur unique, diagnostic clair, chantier propre, délais tenus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SERVICES ===================== */
function Services() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12" id="services">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Services</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServiceCard
          href="/services/ventilation"
          src={IMG_SERVICE_VENTILATION}
          title="Ventilation"
          desc="CTA, ventilation, désenfumage, équilibrage."
        />
        <ServiceCard
          href="/services/plomberie"
          src={IMG_SERVICE_PLOMBERIE}
          title="Plomberie"
          desc="Panoplies, réseaux acier, purge/vidange, régulation."
        />
        <ServiceCard
          href="/services/climatisation"
          src={IMG_SERVICE_CLIM}
          title="Climatisation"
          desc="VRV/DRV & splits — pro & résidentiel."
        />
        <ServiceCard
          href="/services/gtc-gtb"
          src={IMG_SERVICE_REGUL}
          title="GTC/GTB & régulation"
          desc="Défauts/alarmes, diagnostics, corrections, essais."
        />
      </div>
    </section>
  );
}

/* ===================== CONSEIL & OPTIMISATION ===================== */
function ConseilOptimisation() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10" id="conseil">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Conseil & optimisation
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Audits de vos installations CVC, priorisation des actions, réglages fins
            et accompagnement aux économies d’énergie. Des gains mesurables tout en
            assurant la continuité d’activité.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>• Diagnostic clair, chiffrages et planning.</li>
            <li>• Optimisation de régulation et d’équilibrage.</li>
            <li>• Conseils d’usage et sensibilisation des équipes.</li>
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-black/10">
            <div style={{ aspectRatio: "16 / 9" }} className="relative">
              <Image src={IMG_CONSEIL} alt="Conseil & optimisation" fill className="object-cover" sizes="100vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== DÉPANNAGE ===================== */
function Depannage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10" id="depannage">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-black/10">
          <div style={{ aspectRatio: "16 / 9" }} className="relative">
            <Image src={IMG_DEPANNAGE} alt="Dépannage CVC/Plomberie" fill className="object-cover" sizes="100vw" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Dépannage réactif
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Intervention rapide en cas d’arrêt clim/ventilation/énergie. Recherche de pannes,
            réparations sur site, remplacement des pièces usées et remise en service sous contrôle.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>• Diagnostic précis & rapport d’intervention.</li>
            <li>• Mise en sécurité, essais, équilibrage.</li>
            <li>• Conseils d’usage pour éviter la récidive.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ===================== PARTENAIRES ===================== */
function Partenaires() {
  const partners: { name: string; file: string }[] = [
    { name: "Actemium", file: "actemium.png" },
    { name: "ADP Groupe", file: "adp-groupe.png" },
    { name: "ENGIE Solutions", file: "engie-solutions.png" },
    { name: "ETT", file: "ett.png" },
    { name: "SPIE Facilities", file: "spie-facilities.png" },
    { name: "UNIBAIL-WESTFIELD", file: "unibail-westfield.png" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        Ils nous font confiance
      </h2>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-slate-200 bg-white/80 p-4 flex items-center justify-center h-24"
            title={p.name}
          >
            {/* <img> natif pour éviter les blocages Next/Image sur SVG */}
            <img
              src={`/partners/${p.file}`}
              alt={p.name}
              className="h-12 w-auto max-w-[180px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={IMG_LOGO}
              alt="YPIOS"
              width={44}
              height={44}
              className="rounded-full object-contain"
            />
            <span className="text-lg font-semibold" style={{ color: YPIOS_BLUE }}>
              YPIOS Energie
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            <strong>Climatisation, Ventilation et Plomberie</strong>
            <br />
            Installation, entretien & maintenance pour <strong>tertiaire</strong> –{" "}
            <strong>industriel</strong> – <strong>résidentiel</strong>.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Contact</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>
              Email :{" "}
              <a
                href="mailto:contact@ypios.fr"
                className="underline decoration-slate-300 hover:decoration-slate-500"
              >
                contact@ypios.fr
              </a>
            </li>
            <li>Île-de-France</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Liens</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>
              <Link href="#services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="hover:underline">
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} YPIOS Energie — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

/* ===================== PAGE ===================== */
export default function YpiosLanding() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <Services />
      <ConseilOptimisation />
      <Depannage />
      <Partenaires />
      <Footer />
    </main>
  );
}