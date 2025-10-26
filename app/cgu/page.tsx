// app/cgu/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU — Conditions générales d’utilisation",
  description:
    "Conditions générales d’utilisation du site YPIOS Énergie.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero simple, cohérent avec les autres pages légales */}
      <section className="relative w-full">
        <div className="relative w-full h-[32vh] min-h-[220px] max-h-[360px] bg-slate-900">
          <div className="absolute inset-0 flex items-end justify-center text-center px-4 pb-6 md:pb-8">
            <div>
              <h1 className="text-white font-extrabold tracking-tight text-3xl md:text-4xl">
                Conditions générales d’utilisation (CGU)
              </h1>
              <p className="mt-2 text-white/90 text-sm md:text-base">
                Règles d’usage du site et informations légales essentielles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-slate max-w-none">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales d’utilisation (CGU) ont pour objet
            d’encadrer l’accès et l’utilisation du site édité par YPIOS Énergie.
          </p>

          <h2>2. Accès au site</h2>
          <p>
            Le site est accessible 7j/7 et 24h/24, sauf cas de force majeure,
            maintenance ou contraintes techniques.
          </p>

          <h2>3. Contenus et responsabilité</h2>
          <p>
            Les informations publiées le sont à titre indicatif. Malgré le soin
            apporté, YPIOS Énergie ne saurait être tenue pour responsable des
            éventuelles imprécisions ou omissions.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments du site (textes, images, logos, mises en page…)
            est protégé. Toute reproduction non autorisée est interdite.
          </p>

          <h2>5. Données personnelles et cookies</h2>
          <p>
            Pour en savoir plus sur le traitement de vos données et les cookies,
            consultez notre{" "}
            <a href="/politique-confidentialite" className="underline">
              Politique de confidentialité
            </a>{" "}
            et notre{" "}
            <a href="/politique-des-cookies" className="underline">
              Politique des cookies
            </a>.
          </p>

          <h2>6. Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers. Nous n’exerçons
            aucun contrôle sur ces ressources et déclinons toute responsabilité
            quant à leurs contenus.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Les présentes CGU sont régies par le droit français. Tout litige relève
            de la compétence des tribunaux français.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question, écrivez-nous à{" "}
            <a href="mailto:contact@ypios.fr" className="underline">
              contact@ypios.fr
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}