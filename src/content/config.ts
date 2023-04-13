import { defineCollection } from 'astro:content'
import { postsSchema } from './postsSchema.ts'
const postCollection2022 = defineCollection(postsSchema)
const postCollection2023 = defineCollection(postsSchema)

export const collections = {
  2022: postCollection2022,
  2023: postCollection2023,
}
