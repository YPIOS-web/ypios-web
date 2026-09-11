# Rapport de validation — YPIOS V3.1.0

Date : 11 septembre 2026

## Portée de la V3.1.0

Premier cycle éditorial SEO préparé à partir de la V3.0.7 de production. La version cible les trois pages présentant le meilleur potentiel immédiat dans Google Search Console : Ventilation, Plomberie et Réalisations.

Données de référence du 10 juin au 7 septembre 2026 :

- Plomberie : 48 impressions, position moyenne 5,17 et aucun clic ;
- Réalisations : 36 impressions, position moyenne 5,00 et aucun clic ;
- Ventilation : 34 impressions, position moyenne 11,76 et aucun clic.

Les titres, descriptions et intitulés visibles ont été rendus plus explicites. Les pages Ventilation et Plomberie reçoivent un bloc éditorial décrivant le périmètre d’intervention, les adaptations de l’existant, les sites occupés, la maintenance et la traçabilité, sans ajouter de client, chiffre ou résultat non validé.

## Contrôles locaux V3.1.0 réalisés le 11 septembre 2026

- vérification TypeScript stricte : OK ;
- build de production Next.js 16.3.3 : OK, 18 routes générées ;
- audit des dépendances de production : 0 vulnérabilité connue ;
- rendu HTML des nouveaux titres, descriptions, H1 et URL canoniques : OK ;
- sitemap généré en `www` avec une date `lastModified` propre à chaque page : OK ;
- revue React : composants serveur conservés, aucun hook ni JavaScript client ajouté, structure de titres et images optimisées conservées ;
- aucun changement du formulaire, de GA4, du SMTP, de reCAPTCHA, des dépendances ou des en-têtes de sécurité.

## Contrôles requis sur la Preview Vercel

- vérifier les pages Ventilation, Plomberie et Réalisations sur ordinateur et mobile ;
- contrôler la lisibilité du nouveau bloc « Notre approche » ;
- vérifier l’absence de régression sur l’en-tête, les boutons, les images et le pied de page ;
- contrôler les métadonnées et le sitemap sur l’URL de Preview ;
- après validation, fusionner seulement avec l’accord explicite de Guillaume.

## Suivi externe restant

Search Console liste encore uniquement l’ancien sitemap `https://ypios.fr/sitemap.xml`, soumis le 2 novembre 2025 et non téléchargé depuis le 5 janvier 2026. Après la mise en production de la V3.1.0, le sitemap `https://www.ypios.fr/sitemap.xml` devra être soumis dans Search Console.

## Validation héritée de la V3.0.7

## Portée de la V3.0.7

Le second essai réel a confirmé que GA4 recevait `page_view` et `form_start`, mais toujours pas `generate_lead`. La V3.0.6 attendait correctement l'initialisation Analytics, mais son effet ne se relançait pas lorsque le routeur Next.js ajoutait les paramètres de confirmation sans remonter le layout racine.

Le correctif abonne désormais le suivi au chemin et aux paramètres d'URL courants. L'arrivée sur `/contact?sent=1&lead=…` déclenche donc le contrôle de conversion même lors d'une navigation côté client.

## Contrôles locaux V3.0.7 réalisés le 11 septembre 2026

- vérification TypeScript stricte : OK ;
- build de production Next.js 16.3.3 : OK, 18 routes générées ;
- génération statique avec la frontière `Suspense` : OK ;
- audit des dépendances de production : 0 vulnérabilité connue ;
- aucun changement graphique, éditorial, SMTP ou de validation du formulaire.

## Contrôles requis sur la Preview Vercel

- partir de `/contact` avec le consentement Analytics accepté ;
- simuler une navigation côté client vers une URL de confirmation valide ;
- confirmer que le suivi détecte la nouvelle URL sans rechargement complet ;
- transmettre un seul formulaire de test après validation de la Preview ;
- vérifier `generate_lead` dans GA4 Temps réel ;
- confirmer que l'identifiant `lead` disparaît après émission et qu'un rechargement ne recompte pas la demande.

## Portée de la V3.0.6

La V3.0.6 corrige la course d'initialisation observée lors du premier essai réel de `generate_lead` : GA4 recevait `page_view` et `form_start`, mais l'événement de confirmation pouvait être émis avant que la commande `gtag` soit disponible.

Le correctif attend jusqu'à cinq secondes la disponibilité de Google Analytics. L'identifiant de confirmation n'est marqué comme suivi et retiré de l'URL qu'après mise en file de `generate_lead`.

## Contrôles requis sur la Preview Vercel

- accepter le consentement Analytics dans une nouvelle session ;
- transmettre un seul formulaire de test ;
- vérifier `generate_lead` dans le rapport GA4 Temps réel ;
- confirmer que l'identifiant `lead` disparaît de l'URL après émission ;
- recharger la page de confirmation et confirmer l'absence de second `generate_lead`.

## Validation héritée de la V3.0.5

## Portée de la V3.0.5

La V3.0.5 est une mise à niveau technique préparée à partir du MASTER V3.0.4. Elle ne modifie ni les contenus commerciaux, ni le graphisme, ni le transport SMTP du formulaire.

Principaux correctifs :

- événements GA4 conditionnés au consentement pour mesurer les demandes transmises et les intentions de contact ;
- déduplication de l'événement `generate_lead` sans stockage de donnée personnelle ;
- date stable dans le sitemap ;
- redirection permanente applicative de l'hôte secondaire vers `www.ypios.fr` ;
- mise à jour de Nodemailer de 9.0.6 vers 9.1.1.

## Contrôles V3.0.5 réalisés le 10 septembre 2026

- installation et verrouillage des nouvelles dépendances : OK ;
- vérification TypeScript stricte : OK ;
- build de production Next.js 16.3.3 : OK, 18 pages générées ;
- audit des dépendances de production : 0 vulnérabilité connue ;
- validation par Next.js de la configuration de redirection : OK ;
- aucune donnée personnelle ajoutée aux paramètres Analytics : OK ;
- aucun déploiement, merge ou changement de production effectué.

## Contrôles requis sur la Preview Vercel

- vérifier la réception de `generate_lead`, `email_click`, `phone_click` et `contact_intent` avec consentement accepté ;
- vérifier qu'aucun traceur Analytics ne se charge avant consentement ;
- transmettre un formulaire de test et confirmer sa réception OVHcloud avant de contrôler `generate_lead` ;
- contrôler que le rechargement de la confirmation ne produit pas un second `generate_lead` ;
- contrôler la redirection permanente `ypios.fr` vers `www.ypios.fr` dans la configuration de domaine Vercel et sur les réponses HTTP réelles.

Le déploiement Preview puis la promotion en production restent soumis à la validation de Guillaume.

## Validation héritée de la V3.0.4

### Portée de la V3.0.4

La V3.0.4 est une passe éditoriale et de cohérence réalisée sur la V3.0.3 déjà validée en production : aucun changement de dépendance, de formulaire, de logique SMTP, de sécurité ou de structure graphique.

Principaux correctifs :

- harmonisation de la référence **Westfield Les 4 Temps** ;
- usage de **mise en service** pour le vocabulaire général ;
- reformulation du bloc dépannage en **interventions correctives** ;
- remplacement de **BIM & DOE** par **Plans & DOE** ;
- recentrage du positionnement sur les environnements tertiaires, ERP et industriels ;
- nettoyage de formulations techniques ventilation/climatisation/plomberie ;
- suppression de l’ancienne page `/services/a-propos` et redirection permanente vers l’accueil.

### Validation héritée de la V3.0.3

La base V3.0.3 avait été contrôlée sous :

- Node.js 24.19.0
- Next.js 16.3.3
- React 19.2.8
- TypeScript 5.9.3

Résultats validés le 30 août 2026 :

- installation reproductible depuis `package-lock.json` : OK ;
- vérification TypeScript stricte : OK ;
- build de production Next.js : OK ;
- audit des dépendances de production : 0 vulnérabilité connue ;
- déploiement d’aperçu Vercel : OK ;
- reCAPTCHA : OK ;
- envoi réel sans pièce jointe vers OVHcloud : OK ;
- envoi réel avec pièce jointe PDF vers OVHcloud : OK ;
- affichage du succès uniquement après acceptation SMTP : OK ;
- domaine canonique `www.ypios.fr` : OK.

### Contrôles V3.0.4 réalisés le 8 septembre 2026

- syntaxe `next.config.mjs`, `postcss.config.mjs` et `tailwind.config.js` : OK ;
- `package.json` et `package-lock.json` valides : OK ;
- analyse syntaxique de l’ensemble des fichiers TypeScript/TSX modifiés et du projet : aucune erreur de syntaxe ;
- contrôle des 24 références d’assets utilisées par le code : 0 fichier manquant ;
- contrôle des anciennes formulations (`YPIOS Énergie`, `Résidentiel`, `Les Quatre Temps`, `BIM & DOE`, `remise en service`, `APSAD`) dans le code de production : aucune occurrence résiduelle ;
- contrôle des nouvelles formulations (`Westfield Les 4 Temps`, `Plans & DOE`, `mise en service`) : OK ;
- contrôle de la suppression de `/services/a-propos` et de sa redirection permanente : OK ;
- contrôle d’absence de fichier `.env` privé et de secret évident dans le MASTER : OK.

### Contrôle à exécuter au déploiement

L’environnement de cette passe V3.0.4 ne dispose pas d’un accès au registre npm et utilise Node.js 22 ; il n’a donc pas été possible de réinstaller les dépendances pour relancer localement le build complet sous Node.js 24.

Comme la V3.0.4 ne modifie ni les dépendances ni la logique applicative, le contrôle final attendu sur Vercel ou sur une machine Node.js 24 reste :

```bash
npm ci
npm run verify
npm run audit:prod
```

Le déploiement Preview Vercel doit être utilisé comme dernier garde-fou avant promotion en production.
