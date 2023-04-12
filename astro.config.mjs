import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    unocss(),
  ],
})
