// app/mentions-legales/page.tsx
import Image from "next/image";

export const metadata = {
  title: "Mentions légales & CGU – YPIOS Énergie",
  description:
    "Informations légales de l’éditeur du site YPIOS Énergie, hébergeur, propriété intellectuelle et conditions d’utilisation.",
};

export default function MentionsLegalesPage() {
  return (
    <main id="contenu" className="min-h-screen bg-slate-50">
      {/* Bandeau plein écran (comme les pages services) */}
      <section className="relative w-full">
        <div className="relative w-full h-[58vh] min-h-[460px] max-h-[720px]">
          <Image
            src="/images/Local%20technique%20CVC%20%E2%80%94%20CTA,%20panoplie%20%26%20gaines.png"
            alt="Mentions légales"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60" />
          <div className="absolute inset-x-0 bottom-8 px-4">
            <div className="max-w-[1400px] mx-auto text-center">
              <h1 className="text-white text-3xl sm:text-4xl font-extrabold drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                Mentions légales & CGU
              </h1>
              <p className="mt-2 text-white/95 max-w-3xl mx-auto text-sm sm:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                Informations légales, propriété intellectuelle, conditions d’utilisation
                et contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Éditeur */}
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Éditeur du site</h2>
          <p className="mt-2 text-slate-700">
            Le site est édité par <strong>YPIOS Énergie</strong>, EURL au capital de
            1 000,00 €, immatriculée au RCS d’Évry sous le numéro <strong>984 761 684</strong>.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm text-slate-700">
            <div>
              <div className="font-medium text-slate-900">SIREN</div>
              <div>984761684</div>

              <div className="mt-3 font-medium text-slate-900">TVA intracom</div>
              <div>FR05984761684</div>

              <div className="mt-3 font-medium text-slate-900">Siège social</div>
              <div>2 Rue des Hauts Sablons, 91310 Lisses, France</div>

              <div className="mt-3 font-medium text-slate-900">
                Directeur de la publication
              </div>
              <div>Ferreira Marques Guillaume, Gérant</div>
            </div>

            <div>
              <div className="font-medium text-slate-900">SIRET (siège)</div>
              <div>98476168400013</div>

              <div className="mt-3 font-medium text-slate-900">Code NAF / APE</div>
              <div>41.20A — Construction de maisons individuelles</div>

              <div className="mt-3 font-medium text-slate-900">Contact</div>
              <div>
                <a
                  href="mailto:contact@ypios.fr"
                  className="underline decoration-slate-300 hover:decoration-slate-500"
                >
                  contact@ypios.fr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hébergeur */}
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Hébergeur</h2>
          <p className="mt-2 text-slate-700">
            Les informations relatives à l’hébergement du site&nbsp;:
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm text-slate-700">
            <div>
              <div className="font-medium text-slate-900">Hébergeur</div>
              <div>—</div>
            </div>
            <div>
              <div className="font-medium text-slate-900">Adresse</div>
              <div>—</div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            (À compléter si nécessaire — OVH, Vercel, Scaleway, etc.)
          </p>
        </div>

        {/* Propriété intellectuelle */}
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Propriété intellectuelle
          </h2>
          <p className="mt-2 text-slate-700">
            L’ensemble des contenus présents sur le site (textes, images, logos, vidéos,
            icônes, mises en page…) sont protégés par le droit d’auteur. Toute
            reproduction ou représentation, totale ou partielle, sans autorisation
            expresse de YPIOS Énergie est interdite.
          </p>
        </div>

        {/* Données personnelles */}
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Données personnelles</h2>
          <p className="mt-2 text-slate-700">
            Les informations transmises via le formulaire de contact sont utilisées
            uniquement pour répondre à votre demande et ne sont pas cédées à des tiers.
            Vous disposez d’un droit d’accès, de rectification et d’effacement en nous
            contactant à l’adresse <strong>contact@ypios.fr</strong>.
          </p>
        </div>

        {/* Conditions d’utilisation */}
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Conditions d’utilisation
          </h2>
          <p className="mt-2 text-slate-700">
            L’utilisation du site implique l’acceptation pleine et entière des présentes
            conditions. Le site peut être mis à jour à tout moment ; les utilisateurs sont
            invités à les consulter régulièrement.
          </p>
        </div>
      </section>
    </main>
  );
}