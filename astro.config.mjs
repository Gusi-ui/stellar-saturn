// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  site: 'https://asociacionmataro.org',
  base: '/',
  trailingSlash: 'always',
  output: 'server',
  adapter: isBuild ? netlify() : undefined,
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [/** @type {any} */(tailwindcss())]
  },
  integrations: [react()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [],
  },
});