export type ProjectDetail = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  contextHeading: string;
  configuration: string;
  context: string[];
  interventionHeading: string;
  interventionLead: string;
  intervention: string[];
  galleryHeading: string;
  technicalPoints: { title: string; text: string }[];
  resultHeading: string;
  result: string;
  serviceLinks: { href: string; label: string }[];
  ctaHeading: string;
  ctaText: string;
  lastModified: string;
};

export type Project = {
  slug: string;
  site: string;
  location: string;
  category: string;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  details?: ProjectDetail;
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
    details: {
      seoTitle: "Climatisation de bureaux à Paris 13e",
      seoDescription:
        "Découvrez l’installation de climatisation et de ventilation réalisée par YPIOS dans des bureaux à Paris 13e, avec cassettes et réseaux apparents.",
      h1: "Installation de climatisation et ventilation dans des bureaux à Paris 13e",
      lead:
        "Intégration de cassettes suspendues et de réseaux de ventilation circulaires apparents dans un plateau de bureaux.",
      contextHeading:
        "Coordonner climatisation, ventilation et réseaux visibles dans un plateau de bureaux.",
      configuration: "Réseaux apparents",
      context: [
        "Cette réalisation concerne l’aménagement CVC des bureaux de Damae Medical à Paris 13e. Les cassettes de climatisation et les réseaux circulaires de ventilation restent visibles dans les volumes du plateau.",
        "La configuration apparente rend directement perceptibles les cheminements techniques. L’installation a donc été organisée avec les chemins de câbles présents dans les mêmes espaces.",
      ],
      interventionHeading:
        "Des équipements intégrés à l’architecture ouverte des bureaux.",
      interventionLead:
        "L’intervention associe les terminaux de climatisation et les réseaux de ventilation dans une composition technique cohérente à l’échelle du plateau.",
      intervention: [
        "Installation des cassettes de climatisation suspendues",
        "Mise en œuvre des réseaux circulaires de ventilation apparents",
        "Organisation des cheminements avec les chemins de câbles",
        "Intégration de l’ensemble dans l’aménagement du plateau de bureaux",
      ],
      galleryHeading:
        "Cassettes et réseaux documentés dans leur configuration réelle.",
      technicalPoints: [
        {
          title: "Cassettes suspendues",
          text: "Les unités de climatisation sont installées en apparent et intégrées aux volumes ouverts des bureaux.",
        },
        {
          title: "Ventilation circulaire",
          text: "Les réseaux aérauliques circulaires suivent des cheminements visibles au-dessus des espaces de travail.",
        },
        {
          title: "Coordination des réseaux",
          text: "Les gaines de ventilation et les chemins de câbles partagent le même volume technique et sont organisés de manière lisible.",
        },
      ],
      resultHeading: "Une installation CVC intégrée aux volumes du plateau.",
      result:
        "Les photographies présentent les cassettes suspendues, les réseaux circulaires et les chemins de câbles dans leur configuration finale. L’ensemble conserve le caractère apparent prévu pour l’aménagement des bureaux.",
      serviceLinks: [
        { href: "/services/climatisation", label: "Climatisation" },
        { href: "/services/ventilation", label: "Ventilation" },
      ],
      ctaHeading: "Un projet de climatisation ou de ventilation pour vos bureaux ?",
      ctaText:
        "Présentez-nous les locaux, l’aménagement prévu et les contraintes de coordination entre les équipements techniques.",
      lastModified: "2026-09-12",
    },
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
    details: {
      seoTitle: "Création d’un local CTA à l’aéroport d’Orly",
      seoDescription:
        "Découvrez le local CTA neuf réalisé par YPIOS à l’aéroport d’Orly, avec réseaux aérauliques calorifugés et raccordements hydrauliques.",
      h1: "Création d’un local CTA à l’aéroport d’Orly",
      lead:
        "Installation d’une centrale de traitement d’air et de ses réseaux associés pour assurer la ventilation d’un local électrique.",
      contextHeading: "Une installation de ventilation dédiée au local électrique.",
      configuration: "Local CTA neuf",
      context: [
        "Cette réalisation concerne la création d’une installation de ventilation dédiée à un local électrique situé à l’aéroport d’Orly. Le projet intègre une centrale de traitement d’air dans un local technique neuf, ainsi que les réseaux nécessaires à son fonctionnement.",
        "Les photographies du chantier permettent de suivre concrètement l’organisation de l’ensemble : implantation de la CTA, cheminement des gaines calorifugées et raccordements hydrauliques.",
      ],
      interventionHeading: "La CTA et ses réseaux traités comme un ensemble.",
      interventionLead:
        "La réalisation réunit les principaux ouvrages nécessaires à l’intégration de la centrale dans son local technique.",
      intervention: [
        "Création et équipement d’un local CTA neuf",
        "Installation de la centrale de traitement d’air",
        "Mise en œuvre des réseaux aérauliques calorifugés",
        "Réalisation des raccordements hydrauliques associés",
        "Organisation des différents réseaux dans le local technique",
      ],
      galleryHeading: "Une réalisation documentée dans sa configuration réelle.",
      technicalPoints: [
        {
          title: "Centrale de traitement d’air",
          text: "La CTA est implantée dans un espace technique dédié avec les équipements et raccordements associés à l’installation.",
        },
        {
          title: "Réseaux aérauliques calorifugés",
          text: "Les gaines calorifugées assurent la liaison entre la centrale et le réseau de ventilation du local électrique.",
        },
        {
          title: "Raccordements hydrauliques",
          text: "Les liaisons hydrauliques visibles complètent l’équipement de la CTA et sont intégrées à l’organisation générale du local.",
        },
      ],
      resultHeading: "Une installation technique complète et lisible.",
      result:
        "La réalisation forme un ensemble technique regroupant la CTA, les réseaux aérauliques et les raccordements hydrauliques destinés à la ventilation du local électrique. Les photographies présentent l’installation dans sa configuration réelle.",
      serviceLinks: [{ href: "/services/ventilation", label: "Ventilation & CTA" }],
      ctaHeading: "Un projet de CTA ou de ventilation à étudier ?",
      ctaText:
        "Présentez-nous le bâtiment, l’installation existante et les contraintes du local technique.",
      lastModified: "2026-09-11",
    },
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
    site: "Westfield Les 4 Temps",
    location: "La Défense (92)",
    category: "Ventilation",
    title: "Remplacement complet d’une CTA Carrier",
    description:
      "Remplacement complet de la centrale de traitement d’air par une nouvelle CTA Carrier, documentée dans son local technique.",
    images: [
      {
        src: "/images/chantier/quatre-temps-carrier.webp",
        alt: "Nouvelle CTA Carrier installée au centre Westfield Les 4 Temps",
      },
      {
        src: "/images/chantier/quatre-temps-cta.webp",
        alt: "Nouvelle centrale de traitement d’air Carrier dans son local technique au centre Westfield Les 4 Temps",
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

export type DetailedProject = Project & { details: ProjectDetail };

export const detailedProjects = projects.filter(
  (project): project is DetailedProject => Boolean(project.details),
);

export function getDetailedProject(slug: string) {
  return detailedProjects.find((project) => project.slug === slug);
}
