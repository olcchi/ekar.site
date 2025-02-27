import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { remarkReadingTime } from './src/scripts/remark-reading-time.mjs'

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ekar.site',
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: false,
    },
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    unocss({ injectReset: true },),
    react({
      experimentalReactChildren: true,
    })
  ],
  server: {
    port: 8000,
    host: true,
  },
})