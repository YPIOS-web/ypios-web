# Notes de version — YPIOS V3.0.0

Date : 30 août 2026

## Contenu validé

- Conservation de la structure graphique V2.
- Priorité aux photographies réelles YPIOS.
- Institution Saint-Aspais à Melun pour la climatisation du self, les gainables et faux plafonds.
- Damae Medical Paris 13e pour les bureaux, cassettes et réseaux apparents.
- Emmaüs à Osny (95) pour la CTA toiture et les réseaux rectangulaires, avec la vue générale montrant davantage la CTA, les changements de niveau et le supportage.
- Aéroport d’Orly pour le local CTA neuf et la ventilation du local électrique.
- Centre commercial Les Quatre Temps à La Défense pour la vraie CTA Carrier.
- Site industriel de Saint-Quentin-en-Yvelines pour la CTA VIM/CADO et les réseaux circulaires.

## Préparation production

- Migration de Next.js 15.5.24 vers Next.js 16.3.3 et mise à jour de React, TypeScript et Nodemailer.
- Verrouillage des versions applicatives et audit des dépendances.
- Ajout des en-têtes de sécurité, des redirections canoniques et d’une politique de chargement des ressources externes.
- Renforcement du formulaire de contact et des pièces jointes.
- Amélioration du consentement cookies et validation de l’identifiant Analytics.
- Complément des métadonnées SEO et des données structurées.
- Optimisation du logo partenaire ADP, passé d’environ 1,3 Mo à environ 130 Ko.
- Ajout d’un fichier d’environnement modèle, des versions Node attendues et de la documentation d’exploitation.

## Éléments volontairement absents

- Aucun secret SMTP, reCAPTCHA ou Analytics.
- Aucun dossier `node_modules`.
- Aucun cache ou résultat de build.
- Aucun déploiement automatique : le MASTER reste indépendant de l’hébergeur jusqu’à sa configuration finale.
