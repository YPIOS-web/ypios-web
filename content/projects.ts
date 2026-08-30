export type Project = {
  slug: string;
  site: string;
  location: string;
  category: string;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "saint-aspais",
    site: "Institution Saint-Aspais",
    location: "Melun (77)",
    category: "Climatisation",
    title: "Climatisation de l’espace self",
    description:
      "Intégration des gainables, plénums et diffuseurs dans le faux plafond existant, avec pose de l’unité extérieure Daikin.",
    images: [
      {
        src: "/images/chantier/saint-aspais-unite-exterieure.webp",
        alt: "Unité extérieure Daikin installée par YPIOS à l’Institution Saint-Aspais",
      },
      {
        src: "/images/chantier/saint-aspais-faux-plafond.webp",
        alt: "Réseaux de climatisation intégrés dans le faux plafond du self de Saint-Aspais",
      },
      {
        src: "/images/chantier/saint-aspais-gainable.webp",
        alt: "Unité gainable et plénums avant fermeture du faux plafond à Saint-Aspais",
      },
    ],
  },
  {
    slug: "damae-paris-13",
    site: "Damae Medical",
    location: "Paris 13e",
    category: "Climatisation & ventilation",
    title: "Bureaux, cassettes et réseaux apparents",
    description:
      "Installation de cassettes suspendues et de réseaux de ventilation circulaires apparents, coordonnés avec les chemins de câbles du plateau de bureaux.",
    images: [
      {
        src: "/images/chantier/damae-cassette.webp",
        alt: "Cassette de climatisation suspendue et réseau circulaire dans les bureaux Damae à Paris 13",
      },
      {
        src: "/images/chantier/damae-reseaux-apparents.webp",
        alt: "Réseau de ventilation circulaire apparent dans les bureaux Damae à Paris 13",
      },
      {
        src: "/images/chantier/damae-bureaux.webp",
        alt: "Installation CVC apparente réalisée par YPIOS dans les bureaux Damae",
      },
    ],
  },
  {
    slug: "emmaus-osny",
    site: "Emmaüs",
    location: "Osny (95)",
    category: "Ventilation",
    title: "CTA toiture et réseaux rectangulaires",
    description:
      "Mise en œuvre d’une centrale de traitement d’air en toiture avec réseaux rectangulaires superposés, changements de niveau et supportage adapté.",
    images: [
      {
        src: "/images/chantier/emmaus-reseaux-superposes.webp",
        alt: "Vue générale de la CTA toiture et de son supportage réalisés pour Emmaüs à Osny",
      },
      {
        src: "/images/chantier/emmaus-cta.webp",
        alt: "Réseaux rectangulaires avec changements de niveau sur la toiture d’Emmaüs Osny",
      },
    ],
  },
  {
    slug: "aeroport-orly",
    site: "Aéroport d’Orly",
    location: "Orly (94)",
    category: "Ventilation",
    title: "Local CTA neuf pour un local électrique",
    description:
      "Création d’un local CTA neuf avec réseaux aérauliques calorifugés et raccordements hydrauliques pour la ventilation d’un local électrique.",
    images: [
      {
        src: "/images/chantier/orly-local-cta.webp",
        alt: "Local CTA neuf réalisé par YPIOS à l’aéroport d’Orly",
      },
      {
        src: "/images/chantier/orly-cta-detail.webp",
        alt: "CTA et réseaux calorifugés dans le local technique de l’aéroport d’Orly",
      },
      {
        src: "/images/chantier/orly-reseaux-hydrauliques.webp",
        alt: "Réseaux hydrauliques rouges et CTA du local technique d’Orly",
      },
    ],
  },
  {
    slug: "quatre-temps",
    site: "Centre commercial Les Quatre Temps",
    location: "La Défense (92)",
    category: "Ventilation",
    title: "CTA Carrier en local technique",
    description:
      "Intervention sur la centrale de traitement d’air Carrier existante, conservée et documentée dans sa configuration réelle.",
    images: [
      {
        src: "/images/chantier/quatre-temps-carrier.webp",
        alt: "CTA Carrier existante au centre commercial Les Quatre Temps",
      },
      {
        src: "/images/chantier/quatre-temps-cta.webp",
        alt: "Centrale de traitement d’air Carrier dans son local technique aux Quatre Temps",
      },
    ],
  },
  {
    slug: "saint-quentin-en-yvelines",
    site: "Site industriel",
    location: "Saint-Quentin-en-Yvelines (78)",
    category: "Ventilation",
    title: "CTA VIM/CADO et réseaux circulaires",
    description:
      "Installation en toiture d’une CTA VIM/CADO avec réseaux circulaires, supportage et raccordements aérauliques.",
    images: [
      {
        src: "/images/chantier/saint-quentin-hero.webp",
        alt: "CTA VIM CADO et réseaux circulaires à Saint-Quentin-en-Yvelines",
      },
      {
        src: "/images/chantier/saint-quentin-cta.webp",
        alt: "Vue rapprochée de la CTA installée à Saint-Quentin-en-Yvelines",
      },
    ],
  },
];
