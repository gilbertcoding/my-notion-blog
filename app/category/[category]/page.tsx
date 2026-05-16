import type { Metadata } from "next"
import { getCategories, getPostsByCategory } from "@/lib/notion"
import { PostGrid } from "@/components/post/post-grid"

export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} 카테고리 - 인형공예 작품전시`,
    description: `${decodedCategory} 카테고리의 인형공예 작품 목록`,
    openGraph: {
      title: `${decodedCategory} 카테고리`,
      description: `${decodedCategory} 카테고리의 인형공예 작품 목록`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = await getPostsByCategory(decodedCategory)

  return (
    <div className="flex flex-col">
      {/* 카테고리 헤더 */}
      <div className="mx-auto max-w-screen-2xl w-full px-4 py-12">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {decodedCategory}
          </h1>
          <p className="text-lg text-muted-foreground">
            {posts.length}개의 작품을 만나보세요.
          </p>
        </div>
      </div>

      {/* 작품 목록 */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 pb-24">
        <PostGrid posts={posts} />
      </section>
    </div>
  )
}
