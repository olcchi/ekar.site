import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { remarkReadingTime } from './remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://ekar.site',
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [unocss()],
  server: {
    port: 8000,
    host: true,
  },
  output: 'static',
})
