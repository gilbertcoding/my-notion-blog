import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { getPublishedPosts, getPostBySlug } from "@/lib/notion"
import { CategoryBadge } from "@/components/common/category-badge"
import { PostMeta } from "@/components/post/post-meta"
import { formatDate } from "@/lib/utils"

export const revalidate = 0

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
      description: "요청하신 포스트가 없습니다.",
    }
  }

  return {
    title: post.title,
    description: post.description || "인형공예 작품 전시 블로그",
    openGraph: {
      title: post.title,
      description: post.description || "인형공예 작품 전시 블로그",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* 포스트 헤더 영역 */}
      <div className="mx-auto max-w-screen-2xl w-full px-4 py-12">
        <div className="space-y-6">
          {/* 카테고리 배지 */}
          <div className="flex justify-start">
            <CategoryBadge category={post.category} linkable={true} />
          </div>

          {/* 제목 */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {post.title}
          </h1>

          {/* 메타 정보 (날짜) */}
          <p className="text-lg text-muted-foreground">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>

      {/* 메인 이미지 */}
      {post.imageUrl && (
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* 포스트 본문 */}
      <article className="mx-auto max-w-screen-2xl w-full px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 짧은 설명 */}
            {post.description && (
              <div className="text-lg leading-relaxed text-foreground/90">
                {post.description}
              </div>
            )}

            {/* 본문 내용 */}
            {post.content && (
              <div className="prose max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* 사이드바 - 메타 정보 */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <PostMeta post={post} />
            </div>
          </aside>
        </div>
      </article>

      {/* 네비게이션 */}
      <nav className="mx-auto max-w-screen-2xl w-full px-4 py-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center text-primary hover:underline"
          >
            ← 작품 목록으로 돌아가기
          </a>
        </div>
      </nav>
    </div>
  )
}
