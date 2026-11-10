# YPIOS — correctif de sécurité Next.js — 10 novembre 2026

**GO technique pour soumettre ce correctif au déploiement, avec les réserves explicites ci-dessous. Aucune autorisation d'exécution du déploiement n'est déduite de ce GO.**

Le correctif supprime les avis connus portant sur Next.js et sa chaîne d'images dans l'arbre installé testé. Les contrôles locaux passent sans modification de source applicative, de contenu, de route ou de mesure. L'audit reste non nul à cause de Nodemailer 9.1.1, volontairement conservé après qualification séparée. Le rendu navigateur natif et les services réels ne sont pas certifiés.

## Isolation et point de départ

- Branche locale dédiée : `fix/securite-nextjs-20261110`.
- Base de production : `03d468af96ca67467df345549b6940e9f67a84f9` ; nouveau worktree propre avant les modifications.
- Production vérifiée par l'alias Vercel `www.ypios.fr` : déploiement `dpl_HUiskhCpHFdrevbrSfsUszHr1gFt`, commit de base ci-dessus, état READY, cible production.
- Répertoire de travail : `/workspace/scratch/b059cd84b8e8/ypios-securite-nextjs`.
- C1–C3 reste intégralement sur `fix/mesure-prospects-c1-c3-20261110` au commit `4496a5a9bf24231c04c5b1dd5461d99d55c31b7a`. Aucun fichier de son implémentation n'a été repris dans le correctif sécurité.
- `main` n'est pas déplacée. Aucun push, fusion, déploiement, changement GA4, achat, abonnement, formulaire public ou courriel extérieur.

## Versions et raisons du changement

| Paquet | Initial | Final | Justification |
|---|---|---|---|
| Next.js | 16.3.3 | **16.4.6** | Ligne stable corrigée, au-delà du minimum 16.4.1 ; correctifs de maintenance de la ligne 16.4, sans codemod ni migration React |
| sharp | 0.35.4 | **0.35.5** | Version exigée par Next `^0.35.5` ; correction librsvg |
| librsvg natif de sharp | 2.62.91 dans la copie locale de référence | **2.63.2** | Version réellement chargée vérifiée, pas seulement une lecture du manifeste |
| source-map-js | 1.2.1 | **1.2.2** | Patch ciblé de sécurité ; satisfait les plages PostCSS existantes |
| postcss-selector-parser, développement | 6.1.4 | **6.1.6** | Alerte modérée découverte par l'audit complet ; correctif dans la même ligne 6, minimum corrigé 6.1.5 |
| Nodemailer | 9.1.1 | **9.1.1** | Migration majeure 9→10 différée, pas nécessaire pour corriger Next ; risque résiduel documenté |
| React / React DOM | 19.2.8 | **19.2.8** | Inchangés |
| @next/third-parties | 16.3.3 | **16.3.3** | Peer Next compatible et dédupliqué sur 16.4.6 ; aucune modification Analytics |
| semver | 7.8.5 | **7.8.5** | Hausse opportuniste de npm écartée ; version de base conservée et compatible avec sharp |

`@next/env`, les variantes SWC et les paquets natifs sharp/libvips suivent leurs dépendances parentes dans le lockfile. Aucun override global ni mise à jour générale du projet. La suppression de `cssesc` provient de la nouvelle dépendance de développement postcss-selector-parser 6.1.6, qui ne le demande plus ; Tailwind et PostCSS ne changent pas de version.

La consultation en lecture seule du registre a été faite **avant sélection** : aucun avis renvoyé sur les candidats Next 16.4.1/16.4.6, sharp 0.35.5 ou source-map-js 1.2.2. Next 16.4.6 demande Node ≥20.9 et accepte React 19 ; l'exécution locale utilise Node 24.22.1. La version finale est épinglée, pas `latest`.

## Vérification de sharp et dépendances indirectes

La résolution depuis le contexte du paquet Next charge `node_modules/sharp/dist/index.cjs`, version **0.35.5**, avec librsvg **2.63.2** et libvips **8.18.7**. Le lockfile ne contient qu'une seule copie du paquet sharp, en 0.35.5 ; aucune copie 0.35.4 n'est conservée. Les variantes natives multi-plateformes sont mises à jour avec cette version.

Les deux consommateurs PostCSS (celui de Next et celui de développement) utilisent source-map-js **1.2.2**. Le parseur de sélecteurs de Tailwind reste sur la ligne **6**.

## Avis corrigés et résiduels

L'audit de production initial signalait quatre paquets et 25 avis. L'arbre final ne signale plus Next.js, sharp ni source-map-js : **13 avis de production ne sont plus rapportés**. Certains avis partagent une même cause ; ce chiffre n'est pas un compte de 13 CVE distincts.

| Sujet | Avis | Résultat |
|---|---|---|
| DoS App Router / Server Actions, préconditions présentes dans YPIOS | [GHSA-p3m5-59mp-jv5r / CVE-2026-94482](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) | Next 16.4.6 hors plage affectée ; aucun exploit exécuté sur la production |
| ImageResponse Node | [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j) | Version corrigée, même si entrée attaquant absente du rendu statique YPIOS |
| RCE chaîne d'images / librsvg | [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [GHSA-wq5f-xc86-pv6w / référence CVE-2026-96889](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) | Next, sharp et librsvg corrigés dans la copie testée |
| RCE use cache et tableaux typés | [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) | Version corrigée ; fonctionnalité absente du code YPIOS |
| Draft Mode, caches, metadata et SSRF | GHSA-3w37-wq28-93x7, GHSA-4jqv-mc3x-m676, GHSA-39w2-rjm5-chcv, GHSA-f87g-xv8r-7p7x, GHSA-mcj8-r9mp-w47p, GHSA-cjq9-62q9-8jv4, GHSA-h694-7cp9-m8p3 | Plus rapportés pour Next 16.4.6 |
| DoS source map indexée | [GHSA-68fv-2mgg-jv7q / CVE-2026-93749](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | Patch 1.2.2 ; aucun point d'entrée public de source maps identifié |
| DoS sélecteurs CSS, dépendance de développement | [GHSA-rj75-hqrm-r3gf / CVE-2026-104844](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) | Patch 6.1.6 ; usage YPIOS sur sources de confiance à la compilation ; CSS généré identique |

**Résiduel : Nodemailer 9.1.1, un paquet de gravité agrégée élevée, 12 avis.** Les adresses To/CC et le serveur SMTP sont configurés côté serveur. L'e-mail public n'alimente que Reply-To, avec longueur maximale 160 ; il ne permet pas de choisir le destinataire principal ou le serveur SMTP. Aucun mailparser entrant, tableau arbitraire de destinataires, configuration multi-locataire de TLS ou signature DKIM par Nodemailer n'est exposé dans ce code. Les scénarios de serveur SMTP hostile/compromis restent conditionnels, et les ambiguïtés de parsing de Reply-To ne sont pas présentées comme impossibles.

La correction complète de ces avis exige Nodemailer ≥10.1.4, soit une migration majeure : elle reste un chantier distinct avec vérifications de compatibilité et nouveaux tests. Ce correctif n'affirme donc ni « zéro vulnérabilité sur tout le site », ni « audit entièrement réussi ».

## Fichiers modifiés ou créés

| Fichier | Changement |
|---|---|
| `package.json` | Next épinglé à 16.4.6 et commande `test:security` |
| `package-lock.json` | Résolutions Next/SWC/sharp, source-map-js et parseur CSS ciblées |
| `.gitignore` | Exclusion des résultats générés par les tests |
| `tests/security.test.cjs` | Recette HTTP en serveur de production, SMTP/CAPTCHA factices, contrôles SEO et sécurité |
| `tests/security-preload.cjs` | Interception CAPTCHA et refus des fetch extérieurs du processus de test |
| `tests/fixtures/security-seo-base-03d468a.json` | Instantané immuable des réponses sémantiques de la base de production |
| `docs/SECURITE_NEXTJS_2026-11-10.md` | Présent compte rendu et protocole |

Les répertoires `app`, `components`, `content`, `public` et `next.config.mjs` sont identiques à la base. Aucun changement de titre, texte commercial, champ, URL, en-tête de sécurité ou règle Analytics.

## Contrôles et résultats

| Contrôle | Résultat observé |
|---|---|
| Installation initiale de la base | `npm ci --ignore-scripts --no-audit --no-fund` réussi |
| Réinstallation finale depuis le lockfile | Réussie ; empreinte du lockfile strictement conservée avant/après |
| TypeScript | Réussi |
| Lint | Réussi ; dans ce dépôt, cette commande est aussi `tsc --noEmit`, pas ESLint |
| Compilation production | Réussie sous Next 16.4.6, 24 pages générées, contact dynamique |
| Tests sur la base vérifiée | 42 tests comptés par Node réussis, dont un parent et 41 cas |
| Tests finaux après correction | **43 tests comptés réussis, aucun échec**, dont un parent et 42 cas ; le cas supplémentaire compare l'instantané SEO de base |
| Audit production final | **Code de sortie 1 : 0 critique, 1 élevée, Nodemailer uniquement** |
| Audit complet final, développement inclus | **Code de sortie 1 : même résiduel Nodemailer uniquement** |
| Contrôle du diff | Réussi ; aucune source applicative modifiée |
| CSS avant/après patch du parseur | Identique octet pour octet, SHA-256 `2d816f4ffebb8577392d0fc430c78425702df1b16e5d1f8064e61fd6dcae45d7` |
| OpenGraph de la base / final | PNG identique octet pour octet, SHA-256 `2117a8828b8226bfa3580cf7b86182bb72dadb1787bce01e6d68d9584040cf6e` |

L'installation utilise des binaires natifs fournis comme dépendances npm, sans script d'installation du projet ; le build et les images ont ensuite réellement fonctionné. Les futurs réglages de build Vercel ne sont pas modifiés ici.

### Couverture des 43 contrôles

- Les 16 URL du sitemap répondent 200, avec title, description, canonique, H1 unique et JSON-LD LocalBusiness attendus.
- Comparaison complète avant/après des métadonnées collectées, données structurées, liens, CSP, redirections, sitemap et robots ; canonique d'accueil normalisée seulement pour l'équivalence `https://www.ypios.fr` / `https://www.ypios.fr/`.
- Liens internes sans URL cassée ; anciennes routes redirigées ; hôte nu redirigé vers www ; URL inconnues et réalisation non publiée en 404.
- PNG OpenGraph et image locale optimisée accessibles ; SVG et image distante non autorisée refusés en 400.
- Vraie Server Action appelée par HTTP avec ses métadonnées React : acceptation SMTP factice, PDF, rejet SMTP, refus/panne CAPTCHA, champs invalides, limites et signatures de pièces jointes, cinq tentatives IP puis refus, contrôle d'origine, plafond de corps HTTP.
- Le corps de 11 Mio est rejeté avant SMTP, journalise la limite 10 Mo et laisse le serveur répondre à une nouvelle requête. La réponse 500 générique est déjà présente dans la base ; elle n'est pas confondue avec un succès de demande.

Le test final a produit huit messages dans le serveur SMTP factice : sept acceptations principales nominales (dont les cinq tentatives du contrôle IP) et une acceptation de copie seule pour documenter le défaut préexistant. **Cette dernière n'est pas une demande valide ni une preuve de réception principale.** Aucun e-mail n'a quitté la machine.

### Écarts initiaux analysés

La première exécution de référence a échoué sur trois attentes du test, avant toute mise à jour : comparaison textuelle de la canonique racine, en-tête Host non transmis comme attendu par fetch, attente d'un statut 413 alors que Next 16.3.3 rendait un 500 en journalisant 413. Le contrôle utilise maintenant une URL normalisée, une requête HTTP avec Host explicite et vérifie le refus effectif avant SMTP ainsi que la disponibilité du serveur. Une connexion réutilisée après rejet d'un gros corps a aussi été isolée. Les journaux initiaux sont conservés ; ces observations n'ont provoqué aucun changement applicatif.

## Limites des vérifications

- **Navigateur natif non exécuté** dans ce chantier : Chromium a précédemment échoué sur la restriction système de socket. Les résultats HTTP ne certifient pas hydratation, navigation côté client ou affichage mobile.
- SMTP et CAPTCHA sont factices. Aucune livraison OVH, interaction CAPTCHA Google, émission Analytics ou lecture de configuration GA4 n'est validée par ces tests.
- Aucun test d'exploitation ou de charge contre le site public. La correction de l'avis Next repose sur la version corrigée effectivement installée et les avis éditeur, pas sur un essai de déni de service en production.
- Le service d'optimisation d'images géré par Vercel sera à vérifier après un déploiement autorisé ; le binaire local corrigé ne prouve pas à lui seul la configuration distante.
- Les défauts du suivi de consentement, du succès par URL et de l'acceptation SMTP principale corrigés par C1–C3 **restent dans cette branche de sécurité basée sur main**. Le probe copie seule confirme leur préexistence ; ils ne sont ni réintroduits ni corrigés ici. Cette branche ne donne pas un GO pour la recette de mesure C1–C3.

## Reproduction locale

Depuis un checkout isolé du commit candidat sous Node 24, sans `.env` réel :

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm run lint
NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_GA_ID= NEXT_PUBLIC_RECAPTCHA_SITE_KEY=FAKE_LOCAL_SECURITY npm run build
npm run test:security
npm audit --omit=dev
npm audit
```

Les audits doivent actuellement sortir 1 à cause de Nodemailer, et ne plus signaler Next, sharp, source-map-js ou le parseur CSS. Toute autre alerte nécessite une nouvelle qualification. Les résultats HTTP sont écrits dans `test-results/security/patched` par défaut. Le pilote lance Next et SMTP uniquement sur `127.0.0.1`, utilise `example.invalid`, rejette les fichiers d'environnement réels et interdit les fetch de test extérieurs.

## Protocole avant déploiement — nécessite une nouvelle autorisation

1. Présenter le commit exact de cette branche, le diff et le présent résiduel Nodemailer à Guillaume. Obtenir un accord explicite sur le push/PR, la mise à disposition pour validation puis le déploiement ; aucun de ces actes n'est réalisé ici.
2. Recontrôler l'alias public et le SHA de production. Si la production ou main a changé depuis `03d468af…`, analyser les différences et refaire la préparation sur une base validée, sans écraser les travaux intervenus.
3. Conserver l'identifiant du déploiement précédent (`dpl_HUiskhCpHFdrevbrSfsUszHr1gFt` actuellement) et vérifier qu'il reste disponible pour un retour arrière. Relever les paramètres de build et l'existence des variables nécessaires sans exporter les secrets dans un rapport.
4. Exécuter l'installation verrouillée et les contrôles sur le candidat exact. Faire vérifier les traces de build : Node 24, Next 16.4.6, lockfile accepté, sharp corrigé. Ne pas activer de service payant ni changer GA4.
5. Si une Preview est autorisée, vérifier les pages et la navigation sans envoi réel. **L'ancienne gestion Analytics de main est conservée** : le navigateur de validation doit bloquer les destinations Analytics, ou la Preview doit utiliser un identifiant vide dans une configuration de test spécifiquement approuvée. Aucun changement de variable Vercel n'est effectué ici. Une visite HTTP sans exécution de JavaScript n'émet pas les événements de l'intégration navigateur.
6. Prévoir un créneau de faible activité et avertir du risque d'onglet ancien : les identifiants Server Actions peuvent changer au rebuild. Aucun changement de clé de chiffrement, de protection Vercel ou d'abonnement n'est appliqué automatiquement.

## Protocole après déploiement autorisé

1. Confirmer que l'alias public sert le **nouveau SHA approuvé**, cible production READY, et vérifier la version Next dans les journaux de build. Ne pas déduire la version du seul texte visible du site.
2. Refaire les GET des 16 pages, sitemap, robots, canonicals, descriptions, JSON-LD, 404 et redirections, puis les deux contrôles d'images. Comparer à l'instantané fourni ; vérifier les en-têtes et les erreurs serveur.
3. Contrôler visuellement ordinateur/mobile et la navigation dans un navigateur qui bloque Analytics pour cette vérification. Ne pas envoyer de formulaire tant qu'un message TEST précis, son destinataire et son créneau n'ont pas été autorisés séparément.
4. Si cet envoi est ensuite autorisé : utiliser un seul message fictif défini, constater l'acceptation SMTP puis retrouver réellement le message principal. Une éventuelle pièce jointe ou nouvelle tentative requiert le périmètre d'accord correspondant. Aucun succès GA4 ou livraison n'est déduit de la seule redirection du formulaire.
5. Surveiller les erreurs de pages, d'images et de Server Actions, notamment `Failed to find Server Action`. Pour un ancien onglet, recharger avant un nouvel essai ; vérifier d'abord la messagerie en cas d'issue ambiguë afin d'éviter un doublon.
6. Maintenir C1–C3 dans son chantier séparé jusqu'à validation et intégration dédiées. Ce protocole sécurité n'active pas sa recette réelle.

## Retour arrière et limites de sécurité

- **Option opérationnelle après validation distincte :** réaffecter la production au déploiement précédent disponible. Le retour n'a pas été exécuté ni essayé sur la production.
- **Option source :** préparer un revert du commit sécurité sur une branche distincte puis rebâtir/déployer après approbation ; ne pas réécrire main. L'état de départ est identifié par le SHA de base, et un bundle Git local du candidat peut être remis sans push.
- Aucune migration de données ni modification d'environnement n'est introduite : il n'y a pas de schéma de données à restaurer pour ce patch.
- **Revenir à la base réintroduit les versions vulnérables et le risque élevé Server Actions.** Ce n'est pas un état de sécurité acceptable à conserver. Privilégier une correction en avant ; un rollback d'urgence doit être motivé, autorisé et temporaire, avec mitigation adaptée à décider séparément si nécessaire.
- Des onglets et caches clients peuvent conserver d'anciens identifiants d'action. Le rollback ne rappelle ni un e-mail déjà accepté ni un événement déjà émis ; une reprise d'envoi ne doit pas être automatique.

## Décision

**GO pour soumettre le correctif de sécurité au déploiement.** La mise à jour réduit un risque Next applicable, reste limitée aux dépendances et passe les contrôles locaux avec égalité SEO. Ce GO porte sur la présentation du candidat et de ses réserves pour décision humaine : il ne constitue ni une autorisation de déploiement, ni un GO pour la recette réelle C1–C3, ni une certification d'absence totale de vulnérabilité.

Sources primaires consultées le 10 novembre 2026 : [Next 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6), avis GHSA liés ci-dessus et métadonnées du registre npm. Les journaux bruts et inventaires locaux sont conservés dans le dossier de preuves de ce chantier.
