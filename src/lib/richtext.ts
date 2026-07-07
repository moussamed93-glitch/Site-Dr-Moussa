/**
 * Rendu « inline » sûr pour les textes éditables du backoffice.
 *
 * Le Dr Moussa écrit du texte simple dans le CMS ; il peut mettre en **gras** ou en
 * *italique* avec la syntaxe Markdown. On échappe d'abord tout le HTML (aucune balise
 * arbitraire possible → design protégé), puis on n'autorise QUE gras, italique et
 * sauts de ligne. À utiliser avec `set:html`.
 */
export function renderInline(text?: string | null): string {
  if (!text) return '';
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\n/g, '<br />');
}
