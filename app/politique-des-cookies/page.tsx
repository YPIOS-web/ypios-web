// app/politique-des-cookies/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique des cookies",
  description:
    "Détails sur l’usage des cookies, la base légale, les durées et vos droits.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero simple */}
      <section className="relative w-full">
        <div className="relative w-full h-[32vh] min-h-[220px] max-h-[360px] bg-slate-900">
          <div className="absolute inset-0 flex items-end justify-center text-center px-4 pb-6 md:pb-8">
            <div>
              <h1 className="text-white font-extrabold tracking-tight text-3xl md:text-4xl">
                Politique des cookies
              </h1>
              <p className="mt-2 text-white/90 text-sm md:text-base">
                Vos choix, nos engagements de transparence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-slate max-w-none">
          <h2>Finalités</h2>
          <p>
            Nous utilisons des cookies pour permettre le bon fonctionnement du
            site et, si vous l’acceptez, pour mesurer son audience afin d’en
            améliorer le contenu.
          </p>

          <h2>Base légale</h2>
          <p>
            Les cookies strictement nécessaires reposent sur l’intérêt légitime
            (aucun consentement requis). Les cookies de mesure d’audience
            nécessitent votre consentement préalable.
          </p>

          <h2>Liste des cookies</h2>
          <ul>
            <li>
              <strong>Cookies techniques</strong> (session, sécurité, préférences)
            </li>
            <li>
              <strong>Mesure d’audience</strong> (si activée) : statistiques
              globales de fréquentation.
            </li>
          </ul>

          <h2>Durées de conservation</h2>
          <p>
            Les cookies sont conservés pour une durée proportionnée à leur
            finalité (généralement 6 à 13&nbsp;mois). Les données
            d’audience sont agrégées et anonymisées lorsque c’est possible.
          </p>

          <h2>Gestion des préférences</h2>
          <p>
            Vous pouvez revenir sur vos choix à tout moment. Reportez-vous à la
            page <Link href="/cookies" className="underline">Cookies</Link> ou
            utilisez les paramètres de votre navigateur pour supprimer ou bloquer
            les cookies.
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès, de
            rectification, d’opposition et d’effacement des données vous
            concernant. Contact :{" "}
            <a href="mailto:contact@ypios.fr" className="underline">
              contact@ypios.fr
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}