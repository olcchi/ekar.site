// https://docs.astro.build/zh-cn/guides/content-collections/
import { defineCollection, z } from 'astro:content'

const postCollection2022 = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    collection: z.number(),
    description: z.string().optional(),
    readingTime: z.number().optional(),
  }),
})
const postCollection2023 = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    collection: z.number(),
    description: z.string().optional(),
    readingTime: z.number().optional(),
  }),
})

export const collections = {
  2022: postCollection2022,
  2023: postCollection2023,
}
