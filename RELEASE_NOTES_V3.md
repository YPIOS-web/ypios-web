# Notes de version — YPIOS V3.3.0

Date : 12 septembre 2026

## Évolution V3.3.0 — page Maintenance CVC

- Création de la page indexable `/services/maintenance-cvc`, destinée aux bâtiments tertiaires, ERP et sites industriels en Île-de-France.
- Présentation de la maintenance préventive, de la maintenance corrective, du dépannage et de la remise en état des installations CVC.
- Périmètre transversal couvrant ventilation et CTA, climatisation, hydraulique, régulation et GTB/GTC.
- Mise en avant d’un état initial avant contrat, de la criticité des équipements, d’un plan de maintenance défini et d’un suivi documenté.
- Ajout de liens depuis l’en-tête, le pied de page, l’accueil et les quatre pages métiers, puis ajout de l’URL au sitemap.
- Ajout de données structurées `Service` limitées au périmètre réellement présenté sur la page.
- Réutilisation exclusive de photographies YPIOS déjà validées ; aucune image artificielle ajoutée.
- Aucun délai d’intervention, taux d’économie, disponibilité permanente, obligation réglementaire ou résultat chiffré non validé n’est annoncé.

## Évolution V3.2.0 — première étude de cas détaillée

- Création de la page indexable `/realisations/aeroport-orly` consacrée au local CTA neuf réalisé à l’aéroport d’Orly.
- Présentation structurée du besoin, de l’intervention, des principaux ensembles techniques, du résultat observable et des photographies du chantier.
- Architecture dynamique prête à accueillir progressivement d’autres études de cas, sans publier les réalisations qui ne disposent pas encore d’un contenu détaillé validé.
- Ajout de liens internes depuis la page Réalisations et la page Ventilation.
- Ajout de la nouvelle URL et de ses trois images au sitemap.
- Le contenu se limite aux faits déjà publics : local CTA neuf, local électrique, réseaux aérauliques calorifugés et raccordements hydrauliques.
- Aucun débit, pression, matériel, protocole, partenaire, résultat chiffré ou engagement non validé n’a été publié.

## Évolution V3.1.1 — Climatisation et GTC/GTB

- Titres, descriptions et H1 précisés pour positionner les pages Climatisation et GTC/GTB sur les bâtiments professionnels en Île-de-France.
- Ajout d’un bloc « Notre approche » sur chaque page afin d’expliquer les systèmes traités, le diagnostic de l’existant et le périmètre d’intervention.
- Dates `lastModified` actualisées uniquement pour les deux pages réellement modifiées.
- Aucun client, chiffre, résultat ou engagement non validé n’a été ajouté.
- Aucun changement du formulaire, de GA4, du SMTP, de reCAPTCHA, des dépendances ou des en-têtes de sécurité.

## Évolution V3.1.0 — premier cycle SEO éditorial

- Titres et descriptions enrichis pour les pages Ventilation, Plomberie et Réalisations, en cohérence avec les intentions commerciales et la zone d’intervention en Île-de-France.
- H1 de la page Réalisations rendu explicite afin de mieux décrire son contenu aux visiteurs et aux moteurs de recherche.
- Ajout d’un bloc éditorial utile sur les pages Ventilation et Plomberie : périmètre d’intervention, existant, sites occupés, maintenance et traçabilité.
- Dates `lastModified` désormais définies par page dans le sitemap, uniquement selon la date réelle de modification du contenu.
- Aucun nouveau client, chiffre, résultat ou engagement non validé n’a été ajouté.

## Correctif V3.0.7 — suivi de la navigation de confirmation

- Prise en compte des changements de paramètres d'URL effectués par le routeur Next.js après l'envoi du formulaire.
- Relance du contrôle de conversion lorsque l'URL devient `/contact?sent=1&lead=…`, même si le layout Analytics reste monté.
- Ajout de la frontière `Suspense` requise par Next.js pour la lecture réactive des paramètres d'URL.
- Conservation de l'attente GA4, de la déduplication par demande et de l'absence de donnée personnelle.

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
