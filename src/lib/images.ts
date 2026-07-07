/**
 * Résolution des images éditables via le backoffice.
 *
 * Les photos éditables vivent dans `public/images/` : elles sont servies telles quelles
 * (donc prévisualisables dans le backoffice Decap) et référencées par une simple URL.
 * Cette fonction transforme la valeur enregistrée dans le CMS en URL web utilisable.
 *
 * Accepte tous les formats : « /images/x.jpg », « /src/assets/images/x.jpg » (ancien),
 * « x.jpg » ou une valeur vide. Renvoie toujours une URL valide (photo par défaut sinon).
 */
const FALLBACK = '/images/medecin-cabinet.jpg';

export function resolveImage(name?: string | null): string {
  if (!name) return FALLBACK;
  const file = name.split('/').pop();
  if (!file) return FALLBACK;
  return `/images/${file}`;
}
