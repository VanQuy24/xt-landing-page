// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { defaultLocale, locales } from './src/i18n/config.ts';

// https://astro.build/config
export default defineConfig({
  // TODO: confirm production domain before launch.
  site: 'https://xiontechs.com',
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: { prefixDefaultLocale: false },
  },

  // Self-hosted at build time. Any font added here MUST ship the `vietnamese` subset.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: ['500 700'],
      subsets: ['latin', 'latin-ext', 'vietnamese'],
    },
    {
      provider: fontProviders.google(),
      name: 'Open Sans',
      cssVariable: '--font-open-sans',
      weights: ['400 700'],
      subsets: ['latin', 'latin-ext', 'vietnamese'],
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((l) => [l, l])),
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
