// app/cookies/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Informations sur l’utilisation des cookies sur le site YPIOS Énergie.",
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
                Cookies
              </h1>
              <p className="mt-2 text-white/90 text-sm md:text-base">
                Comment et pourquoi nous utilisons des cookies sur ce site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-slate max-w-none">
          <h2>Qu’est-ce qu’un cookie&nbsp;?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal
            (ordinateur, tablette, smartphone) lorsque vous consultez un site
            web. Il permet de stocker des informations pendant une durée
            limitée.
          </p>

          <h2>Types de cookies utilisés</h2>
          <ul>
            <li>
              <strong>Cookies strictement nécessaires</strong> : assurent le
              fonctionnement de base du site (sécurité, accès, préférences
              techniques).
            </li>
            <li>
              <strong>Cookies de mesure d’audience</strong> : optionnels, ils
              nous aident à mieux comprendre l’usage du site afin d’en améliorer
              l’ergonomie et les performances.
            </li>
          </ul>

          <h2>Gestion de vos préférences</h2>
          <p>
            Vous pouvez à tout moment consulter et modifier vos choix depuis la
            page{" "}
            <Link href="/politique-des-cookies" className="underline">
              Politique des cookies
            </Link>
            . Votre navigateur permet également de supprimer les cookies déjà
            déposés et de bloquer leur enregistrement.
          </p>

          <h2>Durées de conservation</h2>
          <p>
            Les cookies sont conservés pour une durée maximale conforme aux
            recommandations de la CNIL et aux exigences techniques (généralement
            6 à 13&nbsp;mois selon la finalité).
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative aux cookies, vous pouvez nous écrire à{" "}
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