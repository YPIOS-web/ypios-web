import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import Image from "next/image";
import Script from "next/script";
import { headers } from "next/headers";
import ContactForm from "@/components/ContactForm";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Devis, études, maintenance ou dépannage : contactez YPIOS et transmettez les éléments utiles à votre demande.",
  alternates: { canonical: "/contact" },
};

const IMG_BANNER = "/images/chantier/saint-quentin-hero.webp";
export default async function ContactPage() {
  await headers();
  return (
    <main id="contenu" className="bg-white">
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      ) : null}

      <section className="relative isolate overflow-hidden bg-[#0D1B3D] text-white">
        <div className="absolute inset-0">
          <Image src={IMG_BANNER} alt="Installation technique YPIOS" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,61,0.95)_0%,rgba(13,27,61,0.74)_52%,rgba(13,27,61,0.3)_100%)]" />
        </div>
        <div className="ypios-container relative flex min-h-[480px] items-end py-16 sm:min-h-[520px] sm:py-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#57D4EA]">Contact</span>
            <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] sm:text-6xl">Parlons de votre besoin.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              Devis, étude, maintenance, dépannage ou reprise d’installation : transmettez-nous le contexte et les documents utiles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 sm:py-20">
        <div className="ypios-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-[26px] bg-[#0D1B3D] p-7 text-white sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#57D4EA]">YPIOS</span>
            <h2 className="mt-3 text-2xl font-bold">Un premier échange suffit souvent à cadrer la suite.</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Site, symptômes, contraintes d’exploitation, délais, photos ou rapports : envoyez ce que vous avez. Nous organiserons les informations avec vous.
            </p>
            <div className="mt-7 space-y-4 border-t border-white/12 pt-6 text-sm text-white/78">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">E-mail</div>
                <a href="mailto:contact@ypios.fr" className="mt-1 block font-semibold text-white">contact@ypios.fr</a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">Adresse</div>
                <p className="mt-1">2, rue des Hauts Sablons<br />91310 Leuville-sur-Orge</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">Zone</div>
                <p className="mt-1">Île-de-France</p>
              </div>
            </div>
          </aside>

          <div>
            <ContactForm submissionId={randomUUID()} siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
          </div>
        </div>
      </section>
    </main>
  );
}
