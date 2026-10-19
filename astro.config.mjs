// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://briansittmann.dev',
  devToolbar: { enabled: false },
  // English at `/`, Spanish at `/es/`. No redirect by browser language: each version keeps its own URL.
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // sitemap-index.xml, listed in public/robots.txt. Each URL carries its other language as an alternate,
  // with the same plain `en` / `es` codes as the `hreflang` links in Base.astro.
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } } })],
  vite: {
    plugins: [tailwindcss()]
  }
});