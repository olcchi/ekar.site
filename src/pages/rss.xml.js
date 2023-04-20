import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function get(context) {
  const collection2022 = await getCollection('2022')
  const collection2023 = await getCollection('2023')
  const posts = [...collection2022, ...collection2023]
  return rss({
    // stylesheet: '/rss/rssStyles.xsl',
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // 这个例子假设所有的文章都被渲染为 `/blog/[slug]` 路由
      link: `/post/${post.slug}/`,
    })),
  })
}
