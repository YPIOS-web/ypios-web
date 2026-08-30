# Checklist de mise en production — YPIOS V3

Cette liste sépare ce qui est déjà intégré au projet des informations qui doivent être renseignées ou confirmées par YPIOS au moment de la mise en ligne.

Validation fonctionnelle du 30 août 2026 : formulaire reCAPTCHA et réception OVHcloud confirmés, y compris avec une pièce jointe PDF.

## 1. À confirmer avant ouverture publique

- Valider une dernière fois la raison sociale, le capital, les numéros SIREN/SIRET/TVA, le code APE, l’adresse et le directeur de publication affichés dans les mentions légales.
- Confirmer que l’hébergement applicatif retenu est bien Vercel. En cas de changement, modifier la rubrique « Hébergeur » dans `app/mentions-legales/page.tsx` et `content/legal.ts`.
- Confirmer qu’OVHcloud reste le prestataire du nom de domaine et de la messagerie.
- Faire relire les mentions légales, la politique de confidentialité et la politique des cookies par la personne responsable de ces sujets chez YPIOS.
- Valider les textes commerciaux, les logos partenaires et le droit de publication de toutes les photographies.

## 2. Variables à renseigner sur l’hébergeur

Obligatoires pour le formulaire :

- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_TO`

À vérifier ou adapter :

- `SMTP_HOST=ssl0.ovh.net`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `CONTACT_CC`

Facultatives :

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` et `RECAPTCHA_SECRET_KEY` — toujours configurer les deux ensemble ;
- `NEXT_PUBLIC_GA_ID` — format GA4 `G-…`, chargé seulement après consentement.

## 3. Contrôles techniques avant bascule

```bash
npm ci
npm run verify
npm run audit:prod
```

- Tester l’accueil, les quatre pages métiers, Réalisations, Contact et les pages légales sur ordinateur et mobile.
- Envoyer un formulaire réel avec et sans pièce jointe, puis vérifier la réception, le champ « Répondre à » et les courriers indésirables.
- Vérifier les fichiers PDF, PNG et JPG autorisés ainsi que les messages de refus pour les formats et tailles non conformes.
- Tester le refus, l’acceptation et la modification ultérieure des cookies.
- Vérifier `https://ypios.fr/robots.txt`, `https://ypios.fr/sitemap.xml` et l’image de partage social après déploiement.
- Contrôler la présence des en-têtes de sécurité sur l’URL publique.

## 4. Domaine et messagerie

- Activer HTTPS et rediriger le domaine secondaire vers le domaine canonique retenu.
- Vérifier les enregistrements SPF, DKIM et DMARC de l’adresse d’envoi afin de limiter le classement en spam.
- Conserver les identifiants SMTP uniquement dans les variables chiffrées de l’hébergeur.

## 5. Exploitation

- Conserver l’archive V2 comme point de retour.
- Sauvegarder les variables d’environnement dans le gestionnaire de secrets autorisé par YPIOS.
- Relancer `npm run audit:prod` avant chaque publication importante.
- Tester le formulaire et les principales pages après chaque déploiement.

Le MASTER est prêt à être installé et compilé. La mise en ligne reste conditionnée aux confirmations légales et aux identifiants externes ci-dessus, qui ne doivent pas être inclus dans une archive de code.
