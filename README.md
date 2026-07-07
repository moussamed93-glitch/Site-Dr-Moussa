# Site — Cabinet d'Ophtalmologie Dr Mohamed Moussa

Site vitrine statique construit avec [Astro](https://astro.build) : ultra-rapide, SEO-first, facilement administrable.

## Commandes

```bash
npm install        # première installation
npm run dev        # serveur de développement → http://localhost:4321
npm run build      # génère le site statique dans dist/
npm run preview    # prévisualise le build de production
```

## Comment ajouter du contenu

### Un article de blog
Créer un fichier `src/content/blog/mon-article.md` :

```markdown
---
title: Titre de l'article
description: Résumé en une phrase (utilisé par Google).
date: 2026-07-01
category: Prévention
---

Le contenu en Markdown…
```

L'article apparaît automatiquement sur `/blog/` et dans le sitemap.

### Un service
Copier un fichier existant de `src/content/services/` et adapter le
frontmatter (title, metaTitle, symptoms, faq…). Ajouter ensuite le slug
dans `src/data/site.ts` (tableau `SERVICES`) pour qu'il apparaisse dans
le menu et sur la page d'accueil.

### Les avis Google
Coller les avis réels (texte exact + prénom) dans `src/data/reviews.ts`.
Tant que le tableau est vide, seule la note globale s'affiche.
Mettre à jour `reviewCount` dans `src/data/site.ts` quand le nombre d'avis évolue.

### Photos
Déposer les originaux dans le dossier parent, ajouter une ligne dans
`scripts/optimize-images.mjs`, puis lancer `node scripts/optimize-images.mjs`.

## Points à finaliser avant mise en ligne

1. **Nom de domaine** : remplacer `https://www.drmoussa-ophtalmo.tn` dans
   `astro.config.mjs`, `src/data/site.ts` et `public/robots.txt`.
2. **Lien Med.tn** : déjà renseigné
   (https://www.med.tn/medecin/dr-mohamed-moussa-ophtalmologue-ariana-mnihla/4260)
   — vérifier qu'il ouvre bien la bonne fiche.
3. **Lien avis Google** : remplacer `googleReviewsUrl` par le lien court de la
   fiche Google Business (Partager → Copier le lien). Les textes des avis ne
   sont pas récupérables automatiquement sans API Places facturée : copier
   quelques avis réels dans `src/data/reviews.ts` (texte exact + prénom).
4. **Horaires** : vérifier les horaires dans `src/data/site.ts` (`hours`).
5. **Congrès** : vérifier les intitulés/années des communications dans
   `src/pages/activite-scientifique.astro`.
6. **Formulaire** : le formulaire est prêt pour Netlify Forms (hébergement
   Netlify). Sur un autre hébergeur, utiliser Formspree ou équivalent.
7. **Réseaux sociaux** : aucune page Facebook/Instagram officielle du cabinet
   n'a été trouvée en ligne — créer les pages puis compléter les URLs dans
   `src/data/site.ts`.
8. **Google Search Console + Analytics 4** : après mise en ligne, vérifier le
   domaine dans Search Console (soumettre `sitemap-index.xml`) et ajouter le
   script GA4 dans `src/layouts/Base.astro` si souhaité.

## Backoffice (modifier le contenu sans coder)

Le site embarque **Decap CMS** : une interface d'administration accessible sur
**`/admin/`** (ex. `https://www.drmoussa-ophtalmo.tn/admin/`), protégée par
**e-mail + mot de passe**. Le médecin peut y modifier :

- **Réglages du cabinet** : téléphones, e-mail, adresse, horaires, liens (Maps, Med.tn), nombre d'avis ;
- **Textes de la page d'accueil** : titre, introduction, présentation du médecin ;
- **Avis Google affichés** (à copier mot pour mot) ;
- **Notre matériel** : ajouter/modifier/supprimer des équipements ;
- **Congrès et communications** : légendes et années ;
- **Les 13 pages services** : tout le contenu (symptômes, FAQ, traitements…) + en créer de nouvelles ;
- **Les articles de blog** : créer, modifier, supprimer, avec éditeur visuel et upload de photos.

Chaque sauvegarde crée un commit Git → le site est reconstruit et republié
automatiquement en ~1 minute.

### Activation (une seule fois, ~10 minutes)

1. **GitHub** : créer un dépôt privé et pousser ce dossier :
   ```bash
   git remote add origin https://github.com/<votre-compte>/site-dr-moussa.git
   git push -u origin main
   ```
2. **Netlify** : « Add new site → Import an existing project » → choisir le dépôt.
   Build command : `npm run build` — Publish directory : `dist`. Déployer.
3. **Activer l'authentification** (dans le tableau de bord Netlify du site) :
   - *Integrations → Identity → Enable Identity* ;
   - *Identity → Registration* : choisir **Invite only** (personne ne peut s'inscrire seul) ;
   - *Identity → Services → Git Gateway* : **Enable Git Gateway** ;
   - *Identity → Invite users* : entrer l'e-mail du Dr Moussa. Il reçoit un
     e-mail, clique le lien, choisit son mot de passe — et accède à `/admin/`.

C'est tout : le backoffice est en ligne, sécurisé (invitation seule), gratuit.

## Hébergement recommandé

Netlify, Vercel ou Cloudflare Pages (gratuits pour ce type de site) :
- connecter le dossier `site/` (ou un dépôt Git) ;
- commande de build : `npm run build` — dossier de sortie : `dist/`.
HTTPS, CDN et déploiement automatique sont inclus.
