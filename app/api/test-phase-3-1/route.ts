import { getPublishedPosts, getCategories, getPostBySlug } from "@/lib/notion"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const test = searchParams.get("test") || "all"

  try {
    if (test === "posts" || test === "all") {
      const posts = await getPublishedPosts()
      return Response.json({
        test: "getPublishedPosts",
        count: posts.length,
        data: posts.slice(0, 3),
      })
    }

    if (test === "categories") {
      const categories = await getCategories()
      return Response.json({
        test: "getCategories",
        count: categories.length,
        data: categories,
      })
    }

    if (test === "slug") {
      const posts = await getPublishedPosts()
      if (posts.length > 0) {
        const post = await getPostBySlug(posts[0].slug)
        return Response.json({
          test: "getPostBySlug",
          slug: posts[0].slug,
          found: !!post,
          data: post ? { title: post.title, category: post.category, hasContent: !!post.content } : null,
        })
      }
      return Response.json({ test: "getPostBySlug", error: "No posts found" })
    }

    return Response.json({ error: "Unknown test parameter" }, { status: 400 })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
