// content/legal.ts
// Données légales centralisées pour la page Mentions légales & CGU
// (utilisées par app/mentions-legales/page.tsx)

export type LegalIdentity = {
  brand: string;                // Dénomination commerciale
  form: string;                 // Forme juridique
  capital: string;              // Capital social (format texte)
  rcs: { city: string; number: string };
  siren: string;
  siret: string;
  vat: string;                  // TVA intracommunautaire
  ape: { code: string; label: string };
  address: string;              // Adresse du siège (peut contenir des sauts de ligne)
  director: string;             // Directeur de la publication
  email: string;                // Contact principal
  hosting?: {                   // Hébergeur (à compléter si connu)
    name?: string;
    address?: string;
    url?: string;
  };
  cookies?: {
    policyUrl?: string;
    analytics?: boolean;
  };
};

export const legalIdentity: LegalIdentity = {
  brand: "YPIOS",
  form: "EURL",
  capital: "1 000,00 €",
  rcs: {
    city: "Évry",
    number: "984 761 684",
  },
  siren: "984761684",
  siret: "98476168400013",
  vat: "FR05984761684",
  ape: {
    code: "41.20A",
    label: "Construction de maisons individuelles",
  },
  address: "2 Rue des Hauts Sablons\n91310 Leuville-sur-Orge, France",
  director: "Ferreira Marques Guillaume, Gérant",
  email: "contact@ypios.fr",

  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Avenue #4133, Covina, CA 91723, USA",
    url: "https://vercel.com",
  },

  // Optionnel : lien vers une politique cookies détaillée si vous en avez une
  cookies: {
    policyUrl: "/cookies",
    analytics: true,
  },
};
