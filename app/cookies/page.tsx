// app/cookies/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { legalIdentity } from "@/content/legal";

export const metadata: Metadata = {
  title: "Politique cookies — YPIOS Énergie",
  description:
    "Politique cookies : catégories de cookies, finalités, durée et gestion de vos préférences.",
};

function TitlePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full bg-zinc-900/60 px-6 py-2 text-sm font-medium text-white shadow-lg ring-1 ring-white/10 backdrop-blur">
      {children}
    </div>
  );
}

export default function CookiesPage() {
  const id = legalIdentity;

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="relative h-[44vh] min-h-[320px] w-full">
        <Image
          src="/images/service-clim-1024.png"
          alt="Installations CVC"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/35 via-zinc-900/15 to-transparent" />
        <div className="absolute inset-0 flex items-start justify-center">
          <div className="w-full pt-20 md:pt-24 flex justify-center">
            <TitlePill>Politique cookies</TitlePill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60 space-y-6">
          <p className="text-zinc-700">
            Ce site utilise uniquement des cookies essentiels au fonctionnement. Aucun cookie
            publicitaire. Les cookies d’analyse ne sont pas activés par défaut.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-zinc-500 border-b">
                  <th className="py-2 pr-4">Catégorie</th>
                  <th className="py-2 pr-4">Finalité</th>
                  <th className="py-2 pr-4">Durée</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800">
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Essentiels</td>
                  <td className="py-2 pr-4">
                    Assurer le fonctionnement basique du site (chargement, sécurité, préférences
                    de consentement).
                  </td>
                  <td className="py-2 pr-4">12 mois max</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Mesure d’audience (optionnel)</td>
                  <td className="py-2 pr-4">
                    Statistiques anonymisées pour améliorer le site (désactivé par défaut).
                  </td>
                  <td className="py-2 pr-4">13 mois max</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            <p className="text-zinc-700">
              Vous pouvez modifier vos préférences à tout moment depuis le bandeau cookies ou
              en effaçant les cookies de votre navigateur.
            </p>
            <p className="text-zinc-700">
              Contact : <a href={`mailto:${id.email}`} className="underline">{id.email}</a>
            </p>
          </div>
        </div>
      </section>