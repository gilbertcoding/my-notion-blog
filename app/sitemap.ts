import type { MetadataRoute } from "next"
import { getPublishedPosts, getCategories } from "@/lib/notion"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://my-notion-blog-bice.vercel.app"

  const posts = await getPublishedPosts()
  const categories = await getCategories()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const date = new Date(post.publishedAt)
    return {
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  })

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${encodeURIComponent(category)}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      changeFrequency: "daily" as const,
      priority: 1.0,
      lastModified: new Date(),
    },
    ...postEntries,
    ...categoryEntries,
  ]
}
