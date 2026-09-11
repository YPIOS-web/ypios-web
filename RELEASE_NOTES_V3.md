# Notes de version — YPIOS V3.0.6

Date : 11 septembre 2026

## Correctif V3.0.6 — fiabilisation de `generate_lead`

- Attente explicite de l'initialisation complète de la balise Google avant l'émission de `generate_lead`.
- Marquage de la demande comme suivie et nettoyage de l'identifiant de confirmation uniquement après mise en file de l'événement Analytics.
- Nouvelle tentative possible au rechargement si Google Analytics est bloqué ou ne devient pas disponible dans les cinq secondes.
- Conservation de la déduplication par demande et absence de donnée personnelle dans l'événement.

## Correctifs V3.0.5 — mesure SEO et consolidation technique

Date : 10 septembre 2026

- Ajout d'une mesure GA4 respectueuse du consentement pour les formulaires transmis (`generate_lead`), les clics e-mail (`email_click`), les clics téléphoniques (`phone_click`) et les accès à la page Contact (`contact_intent`).
- Aucun nom, e-mail, téléphone, message ou identifiant personnel n'est transmis à Google Analytics.
- Déduplication de `generate_lead` afin qu'un rechargement de la page de confirmation ne recompte pas la demande.
- Stabilisation des dates `lastModified` du sitemap : elles ne changent plus artificiellement à chaque génération.
- Ajout d'une redirection permanente applicative de `ypios.fr` vers le domaine canonique `www.ypios.fr`, à vérifier également dans la configuration Vercel.
- Mise à jour de Nodemailer vers la version 9.1.1 et nouvel audit des dépendances de production sans vulnérabilité connue.
- Aucun changement éditorial, graphique ou métier ; aucun déploiement automatique.

## Correctifs V3.0.4 — harmonisation éditoriale finale

Date : 8 septembre 2026

- Référence chantier harmonisée en **Westfield Les 4 Temps** dans les pages, légendes et textes alternatifs.
- Usage générique de **mise en service** rétabli ; les formulations de dépannage ont été reformulées en « interventions correctives » et « contrôle du bon fonctionnement ».
- Positionnement recentré sur les environnements **tertiaires, ERP et industriels**.
- Remplacement de « BIM & DOE » par **Plans & DOE** et ajustement de formulations techniques ventilation/désenfumage.
- Suppression du contenu obsolète de `/services/a-propos` et redirection permanente vers l’accueil.
- Nettoyage de quelques formulations techniques et commerciales (référentiels ventilation, plomberie, légendes de réalisations).

## Correctifs V3.0.1 à V3.0.3

- Rétablissement du traitement standard des pièces jointes par Nodemailer afin de restaurer la remise des formulaires avec PDF, PNG ou JPG vers la boîte OVH.
- Conservation de Nodemailer 9.0.6, version auditée sans vulnérabilité connue au moment de cette livraison, plutôt que le retour à l’ancienne version vulnérable.
- Vérification de l’acceptation du message par le serveur SMTP avant d’afficher la confirmation d’envoi.
- Ajout de journaux techniques sans données personnelles : résultat SMTP, nombre de pièces jointes et volume total.
- Suppression du champ anti-robot invisible qui pouvait être rempli automatiquement par le navigateur et afficher un faux succès. La protection repose désormais sur reCAPTCHA et la limitation des tentatives.
- Validation réelle de la réception d’un formulaire avec pièce jointe dans la boîte OVHcloud `contact@ypios.fr`.
- Renouvellement des URL de favicon pour forcer les navigateurs à charger le symbole YPIOS actuel au lieu d’une ancienne icône mise en cache.
- Mise à jour des informations de confidentialité relatives à Google reCAPTCHA.
- Alignement des URL canoniques, du sitemap, de robots.txt et des données structurées sur le domaine principal `www.ypios.fr`.
- Correction de l’image déclarée dans les données structurées afin d’utiliser l’image Open Graph réellement générée par le site.

## Contenu validé

- Conservation de la structure graphique V2.
- Priorité aux photographies réelles YPIOS.
- Institution Saint-Aspais à Melun pour la climatisation du self, les gainables et faux plafonds.
- Damae Medical Paris 13e pour les bureaux, cassettes et réseaux apparents.
- Emmaüs à Osny (95) pour la CTA toiture et les réseaux rectangulaires, avec la vue générale montrant davantage la CTA, les changements de niveau et le supportage.
- Aéroport d’Orly pour le local CTA neuf et la ventilation du local électrique.
- Westfield Les 4 Temps à La Défense pour la vraie CTA Carrier.
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
