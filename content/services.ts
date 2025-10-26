// content/services.ts

/* --------------------------- Types de contenu --------------------------- */
export type PrestationsGroup = { title: string; items: string[] };
export type Highlight = { title: string; text: string };
export type Reference = { title: string; image: string };
export type FAQ = { q: string; a: string };

export type ServiceData = {
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
    prestationsGrouped: [
      {
        title: "Études techniques & dimensionnement",
        items: [
          "Relevés, calculs de débits et sections",
          "Sélection CTA/ventilateurs, schémas aérauliques",
          "Notes de calculs et DOE",
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
          "Gaines acier galvanisé / isolation / calorifuge",
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
          "Moteurs, volets et clapets coupe-feu",
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
      { title: "Normes", text: "RE2020, Règlement sanitaire, sécurité incendie" },
      { title: "Équilibrage", text: "Instruments étalonnés & PV de mesure" },
      { title: "Marques", text: "Atlantic, Aldes, S&P, Systemair…" },
      { title: "Désenfumage", text: "Conformité APSAD / SSI si présent" },
      { title: "BIM & DOE", text: "Plans, schémas et notices mis à jour" },
      { title: "Support", text: "Astreinte selon contrat" },
    ],
    references: [
      { title: "CTA Local Technique", image: "/images/CTA La Défense.png" },
      { title: "Système de ventilation en toiture", image: "/images/ventilation toiture.png" },
      {
        title: "Système de ventilation local technique",
        image: "/images/ventilation local technique.png",
      },
    ],
    faq: [],
  },

  /* ============================= Climatisation ============================= */
  climatisation: {
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
      { title: "Énergie", text: "COP/SEER optimisés" },
      { title: "Garanties", text: "Mises en service conformes fabricants" },
      { title: "SAV", text: "Télémaintenance et délais courts" },
    ],
    references: [
      {
        title: "Bureau — Climatisation murale",
        image: "/images/Climatisation mural bureau.png",
      },
      {
        title: "Bureaux — Plafonniers",
        image: "/images/Climatisation plafonniere bureau.png",
      },
      {
        title: "Bureaux — Plafonniers",
        image: "/images/Climatisation plafonniere bureau 2.png",
      },
      {
        title: "Bureau — Paris centre",
        image: "/images/service-clim-1024.png",
      },
    ],
    faq: [],
  },

  /* =============================== Plomberie =============================== */
  plomberie: {
    prestationsGrouped: [
      {
        title: "Alimentations & évacuations",
        items: [
          "Réseaux EF/ECS/EC",
          "Colonnes et collecteurs",
          "Bouclage ECS",
          "Évacuation EU/EV/EP",
        ],
      },
      {
        title: "Appareillages & chaufferies",
        items: [
          "Appareils sanitaires & robinetterie",
          "Ballons & préparateurs ECS",
          "Adoucisseurs & filtres",
          "Sécurité anti-légionelles",
        ],
      },
      {
        title: "Maintenance",
        items: [
          "Entretien & détartrage",
          "Dépannages et réparations",
          "Recherche de fuites",
          "DOE & plans mis à jour",
        ],
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
      { title: "Panoplies techniques", image: "/images/hero-plomberie-1792x1024.png" },
      { title: "Sanitaires", image: "/images/Sanitaires.png" },
      { title: "Chaufferie maison neuve", image: "/images/Chaufferie maison neuve.png" },
    ],
    faq: [],
  },

  /* =============================== GTC / GTB =============================== */
  "gtc-gtb": {
    prestationsGrouped: [
      {
        title: "Supervision GTB",
        items: [
          "Synoptiques & alarmes",
          "Historisation & tendances",
          "Tableaux de bord énergie",
          "Accès web multi-sites",
        ],
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
        items: [
          "Éclairage, stores/BSO, compteurs",
          "Ventilation parking (CO/NOx)",
          "Groupes froid & chaufferies",
          "Télémaintenance & contrats",
        ],
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
    references: [
      { title: "Armoire GTB industrielle", image: "/images/Armoire GTB industrielle.png" },
    ],
    faq: [],
  },
};

/* Export par défaut pour compatibilité */
export default services;