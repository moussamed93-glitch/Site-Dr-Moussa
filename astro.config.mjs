import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dr-moussa-ophtalmologue.netlify.app',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
