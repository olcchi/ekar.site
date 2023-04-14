import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [unocss()],
  server: {
    port: 8000,
    host: true,
  },
  output: 'static',
})
