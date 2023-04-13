import { defineCollection } from 'astro:content'
import { postsSchema } from './postsSchema'
const postCollection2022 = defineCollection({ schema: postsSchema })
const postCollection2023 = defineCollection({ schema: postsSchema })

export const collections = {
  2022: postCollection2022,
  2023: postCollection2023,
}
