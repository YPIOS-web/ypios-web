# Checklist de mise en production — YPIOS V3

Cette liste sépare ce qui est déjà intégré au projet des informations qui doivent être renseignées ou confirmées par YPIOS au moment de la mise en ligne.

Validation fonctionnelle initiale du 30 août 2026 : formulaire reCAPTCHA et réception OVHcloud confirmés, y compris avec une pièce jointe PDF.

## 1. À confirmer avant ouverture publique

- Valider une dernière fois la raison sociale, le capital, les numéros SIREN/SIRET/TVA, le code APE, l’adresse et le directeur de publication affichés dans les mentions légales.
- Confirmer que l’hébergement applicatif retenu est bien Vercel. En cas de changement, modifier la rubrique « Hébergeur » dans `app/mentions-legales/page.tsx` et `content/legal.ts`.
- Confirmer qu’OVHcloud reste le prestataire du nom de domaine et de la messagerie.
- Faire relire les mentions légales, la politique de confidentialité et la politique des cookies par la personne responsable de ces sujets chez YPIOS.
- Les textes commerciaux, les logos partenaires et le droit de publication des photographies ont fait l’objet de la validation YPIOS ; revalider uniquement en cas de modification ultérieure.

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

Après déploiement, dans GA4 :

- vérifier la réception de `generate_lead`, `email_click`, `phone_click` et `contact_intent` dans Temps réel ou DebugView ;
- marquer `generate_lead` comme événement clé ;
- ne pas ajouter de paramètres contenant un nom, un e-mail, un numéro de téléphone ou le contenu d'un message.

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
- Vérifier `https://www.ypios.fr/robots.txt`, `https://www.ypios.fr/sitemap.xml` et l’image de partage social après déploiement.
- Contrôler la présence des en-têtes de sécurité sur l’URL publique.
- Vérifier que `https://ypios.fr/` et ses sous-pages redirigent en une seule étape, avec un statut permanent 301 ou 308, vers `https://www.ypios.fr/` et le même chemin.

## 4. Domaine et messagerie

- Activer HTTPS et configurer dans Vercel une redirection permanente du domaine secondaire `ypios.fr` vers le domaine canonique `www.ypios.fr` ; la redirection applicative constitue un garde-fou supplémentaire.
- Vérifier les enregistrements SPF, DKIM et DMARC de l’adresse d’envoi afin de limiter le classement en spam.
- Conserver les identifiants SMTP uniquement dans les variables chiffrées de l’hébergeur.

## 5. Exploitation

- Conserver l’archive V2 comme point de retour.
- Sauvegarder les variables d’environnement dans le gestionnaire de secrets autorisé par YPIOS.
- Relancer `npm run audit:prod` avant chaque publication importante.
- Tester le formulaire et les principales pages après chaque déploiement.

## 6. Search Console après déploiement

- Soumettre `https://www.ypios.fr/sitemap.xml` dans la propriété Search Console couvrant le domaine.
- Retirer l'ancien sitemap `https://ypios.fr/sitemap.xml` s'il reste enregistré.
- Demander une nouvelle indexation de l'accueil, des pages Plomberie, Ventilation et Réalisations après contrôle des URL canoniques.
- Vérifier quelques jours plus tard que Google retient bien les URL `www` comme pages canoniques.

Le MASTER est prêt à être installé et compilé. La mise en ligne reste conditionnée aux confirmations légales et aux identifiants externes ci-dessus, qui ne doivent pas être inclus dans une archive de code.
