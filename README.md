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

## Hébergement recommandé

Netlify, Vercel ou Cloudflare Pages (gratuits pour ce type de site) :
- connecter le dossier `site/` (ou un dépôt Git) ;
- commande de build : `npm run build` — dossier de sortie : `dist/`.
HTTPS, CDN et déploiement automatique sont inclus.
