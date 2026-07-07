/* Audit SEO du dossier dist/ — analyse chaque page HTML générée. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(DIST);

const issues = { critical: [], warning: [], opportunity: [] };
const pass = [];
const decode = (s) =>
  s
    ?.replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const get = (html, re) => decode((html.match(re) || [])[1]);
const all = (html, re) => [...html.matchAll(re)];

const internalLinks = new Set();
const definedPages = new Set(
  pages.map((p) => '/' + path.relative(DIST, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '/'))
);

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file).replace(/\\/g, '/');

  const title = get(html, /<title>([^<]*)<\/title>/);
  if (!title) issues.critical.push(`${rel}: pas de <title>`);
  else {
    if (title.length > 65) issues.warning.push(`${rel}: title ${title.length} car. (>65) — "${title.slice(0, 50)}…"`);
    if (title.length < 25) issues.warning.push(`${rel}: title trop court (${title.length})`);
  }

  const desc = get(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) issues.critical.push(`${rel}: pas de meta description`);
  else {
    if (desc.length > 165) issues.warning.push(`${rel}: description ${desc.length} car. (>165)`);
    if (desc.length < 70) issues.warning.push(`${rel}: description courte (${desc.length})`);
  }

  if (!get(html, /<link rel="canonical" href="([^"]*)"/)) issues.critical.push(`${rel}: pas de canonical`);
  if (!/property="og:title"/.test(html)) issues.warning.push(`${rel}: pas d'og:title`);
  if (!/property="og:image"/.test(html)) issues.opportunity.push(`${rel}: pas d'og:image`);
  if (!/name="viewport"/.test(html)) issues.critical.push(`${rel}: pas de viewport`);
  if (!/application\/ld\+json/.test(html)) issues.warning.push(`${rel}: pas de JSON-LD`);

  const h1s = all(html, /<h1[\s>]/g).length;
  if (h1s === 0) issues.critical.push(`${rel}: aucun <h1>`);
  if (h1s > 1) issues.critical.push(`${rel}: ${h1s} <h1>`);

  // imgs sans alt (alt="" décoratif accepté)
  for (const m of all(html, /<img\b(?![^>]*\balt[\s=>])[^>]*>/g)) {
    issues.critical.push(`${rel}: <img> sans attribut alt — ${m[0].slice(0, 80)}`);
  }
  // imgs sans width/height
  for (const m of all(html, /<img\b(?![^>]*\bwidth=)[^>]*>/g)) {
    issues.warning.push(`${rel}: <img> sans width/height — ${(m[0].match(/src="([^"]{0,60})/) || [])[1] || ''}`);
  }

  // liens internes
  for (const m of all(html, /<a[^>]*href="(\/[^"#?]*)"/g)) internalLinks.add(m[1]);

  // lang
  if (!/<html[^>]*lang="fr"/.test(html)) issues.critical.push(`${rel}: <html> sans lang="fr"`);
}

// liens internes cassés
for (const href of internalLinks) {
  const norm = href.endsWith('/') ? href : href + '/';
  const asFile = href.match(/\.\w+$/);
  if (asFile) {
    if (!existsSync(path.join(DIST, href))) issues.critical.push(`Lien interne cassé: ${href}`);
  } else if (!definedPages.has(norm) && !existsSync(path.join(DIST, norm.slice(1), 'index.html'))) {
    issues.critical.push(`Lien interne cassé: ${href}`);
  }
}

// robots + sitemap
if (!existsSync(path.join(DIST, 'robots.txt'))) issues.critical.push('robots.txt manquant');
else pass.push('robots.txt présent');
if (!existsSync(path.join(DIST, 'sitemap-index.xml'))) issues.critical.push('sitemap manquant');
else pass.push('sitemap-index.xml présent');

console.log(`Pages analysées: ${pages.length}`);
console.log(`\n=== CRITIQUES (${issues.critical.length}) ===`);
issues.critical.forEach((i) => console.log('  ✗ ' + i));
console.log(`\n=== AVERTISSEMENTS (${issues.warning.length}) ===`);
issues.warning.forEach((i) => console.log('  ! ' + i));
console.log(`\n=== OPPORTUNITÉS (${issues.opportunity.length}) ===`);
issues.opportunity.forEach((i) => console.log('  · ' + i));
console.log(`\n=== OK ===`);
pass.forEach((i) => console.log('  ✓ ' + i));
