# Design

## Theme

« Warm editorial wellness », référence drhyman.com. Fond crème `#fef9ef`, charbon `#3c3d42` pour le texte et les blocs sombres, terracotta `#b04f46` comme accent unique. Photos à coins arrondis (20px) posées sur des blocs sable décalés. Boutons pilule. Aucune icône décorative.

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--char-900` | `#2e2f33` | Footer, fonds les plus sombres |
| `--char-800` | `#3c3d42` | Titres, panneau CTA, texte fort |
| `--char-700/600` | `#54555c` / `#6a6b72` | Texte secondaire/tertiaire |
| `--terra-700` | `#9c4038` | Hover boutons primaires |
| `--terra-600` | `#b04f46` | Boutons primaires, eyebrows, accents (4.9:1 sur crème) |
| `--terra-500` | `#c05858` | Accents doux, flèches |
| `--terra-100` | `#f7e7e0` | Bloc décalé derrière photos (variante) |
| `--sand-600/500` | `#8f7550` / `#b3925e` | Labels, soulignés |
| `--sand-300/200/100` | `#e3d3ac` / `#f0e6cf` / `#f8f1e2` | Blocs décalés, fonds chauds, hovers |
| `--bg` | `#fef9ef` | Fond de page (crème) |
| `--surface` | `#ffffff` | Sections alternées |
| `--ink` | `#33343a` | Texte principal |
| `--line` | `#ebe2ce` | Filets/séparateurs |

Les anciens tokens (`--navy-*`, `--taupe-*`, `--blue-logo`) sont mappés sur cette palette dans `global.css` pour compatibilité.

## Typography

- **Display** : Fraunces (opsz/SOFT variable) — équivalent Google de « Orleans » ; weight 550, letter-spacing -0.01em.
- **Body** : Hanken Grotesk — équivalent Google de « General Sans ».
- Eyebrows terracotta, uppercase, tracking 0.2em.
- L'italique Fraunces terracotta sert d'accent dans les titres (`<em>` du hero).

## Components

- **Boutons** : pilule (`--radius-pill`), primaire terracotta, outline charbon, light/ghost-light sur fonds sombres. Min-height 48px.
- **PageHero** : bandeau crème, fil d'Ariane, titre serif à gauche, photo arrondie (3/2) sur bloc sable décalé à droite. `compact` masque la photo en mobile.
- **CtaRdv** : grand panneau charbon arrondi (20–36px) inset dans la page, centré.
- **Photos** : radius 20px + ombre douce, bloc `::before` sable/terracotta décalé (~10 %) derrière.
- **Header** : sticky crème translucide, nav nowrap, hamburger sous 1200px (cible 44px min).
- **Tuiles Découvrir** : photo arrondie + voile charbon dégradé + titre serif blanc.
- **Avis** : note géante Fraunces terracotta, citations sur cartes crème arrondies.
- **Partenaires** : logos réels en grayscale 55 %, couleur au survol.

## Layout

- Conteneur 74rem ; rythme 8px (`--s-1`→`--s-10`).
- Splits photo/texte ~0.85/1.15 alternés ; listes à filets `--line` avec hover sable.
- Jamais de `<br>` décoratif : seuls adresses/horaires/titres à 2 lignes voulues en ont.

## Motion

- `.reveal` fade-up 550ms au scroll, `prefers-reduced-motion` respecté partout.
- Transitions 220ms ; zoom 1.04 sur tuiles au survol.
