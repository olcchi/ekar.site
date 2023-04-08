import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import unocss from 'unocss/astro'
import storyblok from '@storyblok/astro'
import { loadEnv } from 'vite'
const env = loadEnv('', process.cwd(), 'STORYBLOK')
// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    unocss(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // Add your components here
        blogPost: 'storyblok/BlogPost',
        blogPostList: 'storyblok/BlogPostList',
        page: 'storyblok/Page',
      },
      apiOptions: {
        // Choose your Storyblok space region
        region: 'us', // optional,  or 'eu' (default)
      },
    }),
  ],
})
