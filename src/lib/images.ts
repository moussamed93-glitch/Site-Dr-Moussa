/**
 * Résolution des images éditables via le backoffice.
 *
 * Les photos éditables vivent dans `src/assets/images/` : elles sont optimisées
 * au build par Astro (WebP, dimensions, srcset) via le composant <Image>.
 * Cette fonction transforme la valeur enregistrée dans le CMS (Decap) en
 * métadonnées d'image utilisables par `astro:assets`.
 *
 * Accepte tous les formats : « /images/x.jpg », « images/x.jpg »,
 * « /src/assets/images/x.jpg » ou « x.jpg ». Renvoie toujours une image
 * valide (photo par défaut sinon).
 */
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true }
);

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop();
  if (file) byName.set(file, mod.default);
}

const FALLBACK_NAME = 'medecin-cabinet.jpg';

export function resolveImage(name?: string | null): ImageMetadata {
  const fallback = byName.get(FALLBACK_NAME);
  if (!fallback) throw new Error(`Image par défaut introuvable : ${FALLBACK_NAME}`);
  if (!name) return fallback;
  const file = name.split('/').pop();
  if (!file) return fallback;
  return byName.get(file) ?? fallback;
}
