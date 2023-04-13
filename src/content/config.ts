import { defineCollection, z } from 'astro:content'
const postCollection2022 = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    description: z.string().optional(),
  }),
})
const postCollection2023 = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    description: z.string().optional(),
  }),
})

export const collections = {
  2022: postCollection2022,
  2023: postCollection2023,
}
