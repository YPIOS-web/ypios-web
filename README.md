# YPIOS — Site vitrine (Next.js + Tailwind)

Ce projet contient la page d'accueil YPIOS prête à déployer.

## Prérequis
- Node.js LTS (recommandé 20.x)
- Un éditeur de code (VS Code)
- Un compte GitHub + Vercel (pour le déploiement)

## Démarrage
```bash
npm install
npm run dev
```
Ouvrez http://localhost:3000

## Où modifier ?
- `public/logo.svg` : remplacez par votre logo (nom identique).
- `components/YpiosLanding.tsx` : téléphone, e-mail, textes.
- `app/page.tsx` : page d'accueil.
- `app/globals.css` : styles globaux (Tailwind).
- `public/images/` : placez ici vos visuels (DALL·E).

## Déploiement (Vercel conseillé)
1. Créez un repo GitHub et poussez le dossier.
2. Sur vercel.com, **Import Project** → sélectionnez le repo → Deploy.
3. Ajoutez votre nom de domaine (DNS) et activez HTTPS.

## SEO & conformité
- Ajoutez des pages : Mentions légales, Politique de confidentialité, Cookies.
- Remplissez `metadata` dans `app/layout.tsx`.
- Ajoutez des balises Open Graph (OG) si besoin.
