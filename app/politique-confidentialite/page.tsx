// app/politique-de-confidentialite/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — YPIOS Énergie",
  description:
    "Informations sur le traitement des données personnelles, cookies et droits RGPD (accès, rectification, effacement).",
};

export default function PrivacyPage() {
  return (
    <main>
      {/* Bandeau titre transparent, comme les autres pages */}
      <section className="relative h-40 sm:h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="rounded-full bg-black/25 backdrop-blur-sm text-white px-5 py-2 ring-1 ring-white/15">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Politique de confidentialité
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-slate max-w-none">
          <h2>1. Responsable de traitement</h2>
          <p>
            Le responsable du traitement est <strong>YPIOS Énergie</strong> (Île-de-France).
            Contact : <a href="mailto:contact@ypios.fr">contact@ypios.fr</a>.
          </p>

          <h2>2. Données collectées</h2>
          <ul>
            <li>Données de contact (nom/société, email, téléphone) via le formulaire.</li>
            <li>Données techniques minimales (logs serveurs, sécurité).</li>
            <li>Cookies strictement nécessaires au fonctionnement du site.</li>
          </ul>

          <h2>3. Finalités &amp; bases légales</h2>
          <ul>
            <li>Réponse aux demandes envoyées via le formulaire (intérêt légitime / pré-contractuel).</li>
            <li>Sécurité, prévention de la fraude (intérêt légitime).</li>
            <li>Mesure d’audience anonymisée (si activée) sur consentement.</li>
          </ul>

          <h2>4. Durées de conservation</h2>
          <ul>
            <li>Demandes de contact : jusqu’à 24 mois après le dernier échange.</li>
            <li>Logs techniques : 6 à 12 mois selon nécessité.</li>
            <li>Cookies : selon leur finalité (voir navigateur).</li>
          </ul>

          <h2>5. Destinataires &amp; transferts</h2>
          <p>
            Données hébergées dans l’UE. Les sous-traitants (hébergeur, messagerie) n’accèdent aux
            données que selon nos instructions et obligations contractuelles.
          </p>

          <h2>6. Vos droits</h2>
          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de
            limitation et de portabilité dans les conditions prévues par la réglementation. Pour
            exercer vos droits : <a href="mailto:contact@ypios.fr">contact@ypios.fr</a>.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Le site utilise des cookies strictement nécessaires. La mesure d’audience (si déployée)
            n’est activée qu’avec votre consentement. Vous pouvez retirer votre consentement en
            supprimant le stockage “cookie-consent-v1” de votre navigateur.
          </p>

          <h2>8. Sécurité</h2>
          <p>
            Mise en œuvre de mesures techniques et organisationnelles appropriées (contrôles
            d’accès, chiffrement en transit, sauvegardes régulières).
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question : <a href="mailto:contact@ypios.fr">contact@ypios.fr</a>.
          </p>
        </div>
      </section>
    </main>
  );
}