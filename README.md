# YPIOS — MASTER production V3

Version : **3.0.3** — 30 août 2026

Ce dossier contient la version de production du site vitrine YPIOS. Il reprend la structure graphique V2 validée, les corrections de localisation et la banque de vraies photos de chantiers YPIOS.

## Socle technique

- Next.js 16.3.3
- React 19.2.8
- TypeScript 5.9.3
- Tailwind CSS 3.4
- Nodemailer 9.0.6
- Node.js 24.x

Les versions applicatives sont verrouillées par `package-lock.json`. Aucun secret, dossier `node_modules` ni fichier de build n’est livré dans le MASTER.

## Test local

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

Le site s’affiche sans identifiants externes. L’envoi du formulaire nécessite les variables SMTP ; reCAPTCHA et Google Analytics restent facultatifs.

## Contrôles

```bash
npm run typecheck
npm run build
npm run audit:prod
```

La commande `npm run verify` regroupe le contrôle TypeScript et le build de production.

## Configuration

Copier `.env.example` vers `.env.local`, puis renseigner uniquement les services utilisés :

- variables `SMTP_*` et `CONTACT_*` : réception des demandes ;
- clés reCAPTCHA : protection facultative du formulaire ;
- `NEXT_PUBLIC_GA_ID` : mesure d’audience facultative, chargée après consentement.

Ne jamais commiter ou transmettre `.env.local`.

## Contenu et médias

- `content/projects.ts` : opérations, localisations et légendes ;
- `content/services.ts` : pages métiers ;
- `public/images/chantier/` : 15 photographies YPIOS optimisées en WebP ;
- `BANQUE_IMAGES.md` : correspondance validée des opérations ;
- `public/brand/` : identité officielle YPIOS ;
- `public/partners/` : logos des références.

La géométrie des installations n’a pas été modifiée. Les photos de chantier ont uniquement été orientées, recadrées et compressées pour le Web. Les visuels génériques restants sur les métiers sans reportage dédié sont présentés comme des illustrations, jamais comme des chantiers YPIOS.

## Préparation production intégrée

- métadonnées, URL canoniques, Open Graph, sitemap, robots et données structurées ;
- domaine canonique aligné sur `https://www.ypios.fr`, destination publique configurée dans Vercel ;
- consentement Analytics avant chargement du traceur ;
- en-têtes HTTP de sécurité et suppression de la signature technique ;
- formulaire renforcé : validation serveur, contrôle de signature des fichiers, limites de poids, reCAPTCHA, limitation des tentatives et délais SMTP ;
- envoi réel validé sur Vercel vers la boîte OVHcloud, avec et sans pièce jointe ;
- dépendances à jour et audit sans vulnérabilité connue au moment de la livraison ;
- image partenaire ADP redimensionnée sans altération visuelle ;
- redirections des anciennes URL légales vers leurs pages canoniques.

Consulter `PRODUCTION_CHECKLIST.md` avant toute mise en ligne et `VALIDATION_V3.md` pour le rapport de contrôle de cette archive.
