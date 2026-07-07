import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.drmoussa-ophtalmo.tn',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
