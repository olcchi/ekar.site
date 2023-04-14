import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
  integrations: [unocss()],
  server: {
    port: 8000,
    host: true,
  },
  output: 'server',
  adapter: netlify(),
})
