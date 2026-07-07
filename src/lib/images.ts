import type { ImageMetadata } from 'astro';

/**
 * Résolution des images éditables via le backoffice.
 *
 * Toutes les photos du dossier `src/assets/images/` sont importées ici et restent
 * optimisées par Astro (webp, tailles responsives). Les pages ne référencent plus
 * une image « en dur » : elles stockent un simple nom de fichier dans un fichier de
 * données (éditable dans le CMS), et cette fonction le résout vers l'image optimisée.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const byName: Record<string, ImageMetadata> = {};
for (const path in modules) {
  const file = path.split('/').pop()!; // ex. "cabinet-1.jpg"
  const base = file.replace(/\.[^.]+$/, ''); // ex. "cabinet-1"
  byName[file] = modules[path].default;
  byName[base] = modules[path].default;
}

/**
 * Convertit une valeur enregistrée par le backoffice en image optimisée Astro.
 * Accepte tous les formats stockés par Decap : « /src/assets/images/x.jpg »,
 * « x.jpg » ou simplement « x ». Renvoie `undefined` si l'image est introuvable.
 */
export function resolveImage(name?: string | null): ImageMetadata | undefined {
  if (!name) return undefined;
  const file = name.split('/').pop() ?? name;
  const base = file.replace(/\.[^.]+$/, '');
  return byName[file] ?? byName[base];
}
