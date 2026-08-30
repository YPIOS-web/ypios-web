# Rapport de validation — YPIOS V3.0.3

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
- Déploiement d’aperçu Vercel : OK
- reCAPTCHA sur le domaine d’aperçu : OK
- Envoi réel sans pièce jointe vers OVHcloud : OK
- Envoi réel avec pièce jointe PDF vers OVHcloud : OK
- Affichage du succès uniquement après acceptation SMTP : OK
- Domaine canonique aligné sur la redirection Vercel vers `www.ypios.fr` : OK
- Image des données structurées accessible : OK

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

## Contrôles à renouveler après fusion en production

Après fusion de la branche validée vers `main`, contrôler une dernière fois le domaine public, HTTPS, le favicon, Google Analytics après consentement et un envoi simple du formulaire. Les étapes sont détaillées dans `PRODUCTION_CHECKLIST.md`.
