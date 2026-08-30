# Notes de version — YPIOS V3.0.3

Date : 30 août 2026

## Correctifs V3.0.1 à V3.0.3

- Rétablissement du traitement standard des pièces jointes par Nodemailer afin de restaurer la remise des formulaires avec PDF, PNG ou JPG vers la boîte OVH.
- Conservation de Nodemailer 9.0.6, version auditée sans vulnérabilité connue, plutôt que le retour à l’ancienne version vulnérable.
- Vérification de l’acceptation du message par le serveur SMTP avant d’afficher la confirmation d’envoi.
- Ajout de journaux techniques sans données personnelles : résultat SMTP, nombre de pièces jointes et volume total.
- Suppression du champ anti-robot invisible qui pouvait être rempli automatiquement par le navigateur et afficher un faux succès. La protection repose désormais sur reCAPTCHA et la limitation des tentatives.
- Validation réelle de la réception d’un formulaire avec pièce jointe dans la boîte OVHcloud `contact@ypios.fr`.
- Renouvellement des URL de favicon pour forcer les navigateurs à charger le symbole YPIOS actuel au lieu d’une ancienne icône mise en cache.
- Mise à jour des informations de confidentialité relatives à Google reCAPTCHA.

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
