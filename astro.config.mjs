import { cp } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Le site est reconstruit uniquement quand le contenu change (commits Decap) :
// la date de build est donc une bonne approximation de <lastmod>.
const buildDate = new Date().toISOString();

// Les photos éditables vivent dans src/assets/images (optimisées par Astro en
// WebP dans les pages). Les originaux sont AUSSI copiés vers /images/ au build,
// uniquement pour que les vignettes du backoffice Decap (public_folder: /images)
// restent visibles — les pages, elles, ne chargent que les versions optimisées.
const copyCmsImages = {
  name: 'copy-cms-images',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await cp(new URL('./src/assets/images/', import.meta.url), new URL('./images/', dir), {
        recursive: true,
      });
    },
  },
};

export default defineConfig({
  site: 'https://drmohamedmoussa.tn',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/merci/'),
      serialize: (item) => ({ ...item, lastmod: buildDate }),
    }),
    copyCmsImages,
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
