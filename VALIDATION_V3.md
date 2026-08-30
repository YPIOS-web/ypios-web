# Rapport de validation — YPIOS V3.0.0

Date : 30 août 2026

## Environnement de contrôle

- Node.js 24.19.0
- Next.js 16.3.3
- React 19.2.8
- TypeScript 5.9.3

## Résultats

- Installation reproductible depuis `package-lock.json` : OK
- Vérification TypeScript stricte : OK
- Build de production Next.js : OK
- Audit des dépendances de production : 0 vulnérabilité connue
- Contrôle des chemins de médias utilisés par le code : OK
- Contrôle des localisations et légendes de chantiers : OK
- Contrôle d’absence de secrets et de fichiers `.env` privés : OK
- Contrôle du contenu final de l’archive : OK

## Pages compilées

- Accueil
- Climatisation
- Ventilation
- Plomberie
- GTC / GTB
- Réalisations
- Contact
- Mentions légales
- Politique de confidentialité
- Cookies
- Sitemap, robots, manifest et image Open Graph

## Limite du contrôle local

L’envoi réel du formulaire, reCAPTCHA, Google Analytics, le domaine et le HTTPS ne peuvent être validés sans les identifiants et l’environnement de production. Ces vérifications sont détaillées dans `PRODUCTION_CHECKLIST.md`.
