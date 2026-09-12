// content/services.ts

/* --------------------------- Types de contenu --------------------------- */
export type PrestationsGroup = { title: string; items: string[] };
export type Highlight = { title: string; text: string };
export type Reference = { title: string; image: string; href?: string };
export type FAQ = { q: string; a: string };
export type Overview = { heading: string; paragraphs: string[] };

export type ServiceData = {
  overview?: Overview;
  prestationsGrouped: PrestationsGroup[];
  highlights: Highlight[];
  references: Reference[];
  faq: FAQ[];
};

/* ---------------------------------------------------------------------- */
/* Services                                                               */
/* ---------------------------------------------------------------------- */

export const services: Record<
  "ventilation" | "climatisation" | "plomberie" | "gtc-gtb",
  ServiceData
> = {
  /* ============================== Ventilation ============================== */
  ventilation: {
    overview: {
      heading: "Ventilation et traitement d’air des bâtiments tertiaires",
      paragraphs: [
        "YPIOS intervient sur les centrales de traitement d’air (CTA), les réseaux aérauliques et les équipements associés, de l’étude aux essais. Nous réalisons les installations neuves, les adaptations de l’existant, la mise au point et les opérations de maintenance dans toute l’Île-de-France.",
        "Sur un site occupé ou une installation à reprendre, l’intervention commence par les relevés utiles : débits, état des réseaux, organes de régulation, supportage et contraintes d’exploitation. L’objectif est de proposer une solution lisible, compatible avec l’existant et documentée à la réception.",
      ],
    },
    prestationsGrouped: [
      {
        title: "Études techniques & dimensionnement",
        items: [
          "Relevés, calculs de débits et sections",
          "Sélection CTA/ventilateurs, schémas aérauliques",
          "Notes de calcul et DOE",
        ],
      },
      {
        title: "Réseaux hydrauliques (tous matériaux)",
        items: [
          "Acier noir, galvanisé, inox, multicouche",
          "Départs/retours, supports, purge et vidange",
          "Raccordements batteries eau chaude/eau glacée",
        ],
      },
      {
        title: "Réseaux aérauliques",
        items: [
          "Gaines en acier galvanisé, isolation et calorifuge",
          "Bouches, grilles, registres et pièges à son",
          "Essais d’étanchéité et mise au point",
        ],
      },
      {
        title: "CTA / Groupes froids & équipements",
        items: [
          "Pose, raccordements, essais fonctionnels",
          "Mise en service et réglages de consignes",
          "Traitement acoustique si requis",
        ],
      },
      {
        title: "Désenfumage",
        items: [
          "Ventilateurs, volets et clapets coupe-feu",
          "Coffrets de relayage et alimentations",
          "Essais réglementaires",
        ],
      },
      {
        title: "Régulation & asservissements",
        items: [
          "Armoires, capteurs/actionneurs, câblage",
          "Paramétrage, supervision & alarmes",
          "Rapports et recommandations",
        ],
      },
    ],
    highlights: [
      { title: "Référentiels", text: "Règlement sanitaire, DTU et sécurité incendie selon projet" },
      { title: "Équilibrage", text: "Instruments étalonnés & PV de mesure" },
      { title: "Marques", text: "Atlantic, Aldes, S&P, Systemair…" },
      { title: "Désenfumage", text: "Réseaux, organes et interfaces SSI selon installation" },
      { title: "Plans & DOE", text: "Plans, schémas et notices mis à jour" },
      { title: "Support", text: "Astreinte selon contrat" },
    ],
    references: [
      {
        title: "Westfield Les 4 Temps — Remplacement complet d’une CTA",
        image: "/images/chantier/quatre-temps-carrier.webp",
        href: "/realisations/quatre-temps",
      },
      {
        title: "Aéroport d’Orly — Local CTA neuf",
        image: "/images/chantier/orly-local-cta.webp",
        href: "/realisations/aeroport-orly",
      },
      {
        title: "Damae Paris 13 — Réseaux apparents",
        image: "/images/chantier/damae-reseaux-apparents.webp",
        href: "/realisations/damae-paris-13",
      },
      { title: "Emmaüs Osny — CTA toiture", image: "/images/chantier/emmaus-reseaux-superposes.webp" },
      {
        title: "Saint-Quentin-en-Yvelines — CTA VIM/CADO",
        image: "/images/chantier/saint-quentin-hero.webp",
        href: "/realisations/saint-quentin-en-yvelines",
      },
    ],
    faq: [],
  },

  /* ============================= Climatisation ============================= */
  climatisation: {
    overview: {
      heading: "Climatisation VRV/DRV pour les bâtiments professionnels",
      paragraphs: [
        "YPIOS conçoit, installe et maintient les systèmes de climatisation VRV/DRV, splits, gainables et cassettes des bureaux, commerces, ERP et bâtiments tertiaires dans toute l’Île-de-France.",
        "Chaque intervention tient compte des usages, des contraintes d’implantation, des niveaux sonores, des réseaux frigorifiques et des évacuations de condensats. Sur une installation existante, nous pouvons également rechercher les défauts, remettre le système en service et proposer les adaptations nécessaires.",
      ],
    },
    prestationsGrouped: [
      {
        title: "Études & bilan de charge",
        items: [
          "Relevés, bilans thermiques & acoustiques",
          "Implantation des UI/UE (esthétique & accès)",
          "Sélection des équipements et variantes",
        ],
      },
      {
        title: "Installation VRV/DRV & splits",
        items: [
          "Pose UI/UE et supports",
          "Condensats, évacuations, calorifuge",
          "Percements, scellements & finitions",
        ],
      },
      {
        title: "Réseaux frigorifiques",
        items: [
          "Brasage/sertissage, épreuves d’étanchéité",
          "Tirage au vide, appoint & contrôle de charge",
          "PV et traçabilité des fluides",
        ],
      },
      {
        title: "Mise en service & conformité",
        items: [
          "Paramétrages constructeurs & optimisation",
          "Contrôles électriques, essais fonctionnels",
          "PV de mise en service, DOE",
        ],
      },
      {
        title: "Régulation/GTB & supervision",
        items: [
          "Scénarios horaires, reports d’alarmes",
          "Intégration GTB, télémaintenance",
          "Tableaux de bord & historiques",
        ],
      },
      {
        title: "Maintenance & dépannage",
        items: [
          "Nettoyage batteries/condenseurs, filtres",
          "Recherche pannes (cartes, détendeurs, sondes)",
          "Contrats adaptés à vos sites",
        ],
      },
    ],
    highlights: [
      { title: "Fluide", text: "Manipulation réglementée — attestations à jour" },
      { title: "Marques", text: "Daikin, Mitsubishi, Toshiba, LG…" },
      { title: "Confort", text: "Niveaux sonores maîtrisés" },
      { title: "Énergie", text: "Réglages orientés performance énergétique" },
      { title: "Fabricants", text: "Paramétrages et mises en service selon préconisations" },
      { title: "SAV", text: "Télémaintenance et intervention selon contrat" },
    ],
    references: [
      { title: "Saint-Aspais — Climatisation du self", image: "/images/chantier/saint-aspais-unite-exterieure.webp" },
      { title: "Saint-Aspais — Gainables et faux plafond", image: "/images/chantier/saint-aspais-gainable.webp" },
      {
        title: "Damae Paris 13 — Cassettes suspendues",
        image: "/images/chantier/damae-cassette.webp",
        href: "/realisations/damae-paris-13",
      },
      { title: "Damae Paris 13 — Réseaux apparents", image: "/images/chantier/damae-reseaux-apparents.webp" },
    ],
    faq: [],
  },

  /* =============================== Plomberie =============================== */
  plomberie: {
    overview: {
      heading: "Plomberie technique pour les bâtiments tertiaires et ERP",
      paragraphs: [
        "YPIOS réalise et remet en état les réseaux EF/ECS, les bouclages, les évacuations EU/EV/EP, les panoplies et les équipements sanitaires. Nos interventions couvrent les travaux neufs, les adaptations d’installations existantes, la maintenance et le dépannage dans toute l’Île-de-France.",
        "Nous intégrons dès l’étude les contraintes d’accès, de continuité de service et d’intervention en site occupé. Les matériaux, équipements et dispositifs de sécurité sont sélectionnés selon l’installation, puis les ouvrages sont remis avec les plans et les éléments de traçabilité utiles.",
      ],
    },
    prestationsGrouped: [
      {
        title: "Alimentations & évacuations",
        items: ["Réseaux EF/ECS", "Colonnes et collecteurs", "Bouclage ECS", "Évacuation EU/EV/EP"],
      },
      {
        title: "Appareillages & chaufferies",
        items: [
          "Appareils sanitaires & robinetterie",
          "Ballons & préparateurs ECS",
          "Adoucisseurs & filtres",
          "Prévention du risque légionelles",
        ],
      },
      {
        title: "Maintenance",
        items: ["Entretien & détartrage", "Dépannages et réparations", "Recherche de fuites", "DOE & plans mis à jour"],
      },
    ],
    highlights: [
      { title: "Matériaux", text: "Cuivre, multicouche, PER, PVC" },
      { title: "Qualité eau", text: "Traitements, adoucisseurs, filtrations" },
      { title: "Sécurité", text: "Groupes de sécurité, clapets, disconnecteurs" },
      { title: "Normes", text: "DTU plomberie en vigueur" },
      { title: "Sites occupés", text: "Interventions planifiées et propres" },
      { title: "Traçabilité", text: "Rapports & photos de fin de travaux" },
    ],
    references: [
      { title: "Panoplies techniques", image: "/images/plomberie-technique.webp" },
      { title: "Sanitaires", image: "/images/sanitaires.webp" },
      { title: "Chaufferie — réseaux et équipements", image: "/images/chaufferie.webp" },
    ],
    faq: [],
  },

  /* =============================== GTC / GTB =============================== */
  "gtc-gtb": {
    overview: {
      heading: "Pilotage, diagnostic et optimisation des installations techniques",
      paragraphs: [
        "YPIOS intervient sur les systèmes GTC/GTB et la régulation CVC des bâtiments tertiaires, ERP et sites industriels en Île-de-France, du diagnostic à l’intégration, à la mise en service et à la maintenance.",
        "L’analyse part de l’installation réelle : automates, sondes, actionneurs, réseaux de communication, synoptiques, historiques et alarmes. L’objectif est d’identifier clairement les défauts, de rétablir un fonctionnement cohérent et de fournir à l’exploitant une supervision lisible.",
      ],
    },
    prestationsGrouped: [
      {
        title: "Supervision GTB",
        items: ["Synoptiques & alarmes", "Historisation & tendances", "Tableaux de bord énergie", "Accès web multi-sites"],
      },
      {
        title: "Régulation CVC",
        items: [
          "Automates (CTA, PAC, chaudières)",
          "Boucles PID, vannes et actionneurs",
          "Sondes, étalonnages, essais fonctionnels",
          "DOE & schémas mis à jour",
        ],
      },
      {
        title: "Intégrations & services",
        items: ["Éclairage, stores/BSO, compteurs", "Ventilation parking (CO/NOx)", "Groupes froid & chaufferies", "Télémaintenance & contrats"],
      },
    ],
    highlights: [
      { title: "Protocoles", text: "BACnet, Modbus, KNX, M-Bus, LON" },
      { title: "Marques GTB", text: "Siemens, Schneider, WIT, TREND, Sauter…" },
      { title: "Cybersécurité", text: "Segmentation réseau, comptes, sauvegardes" },
      { title: "DOE & schémas", text: "Dossiers complets de fin d’affaire" },
      { title: "Sites occupés", text: "Interventions planifiées et discrètes" },
      { title: "Support", text: "Télémaintenance & astreinte selon contrat" },
    ],
    references: [],
    faq: [],
  },
};

/* Export par défaut pour compatibilité */
export default services;
