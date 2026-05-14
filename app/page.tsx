import type { Metadata } from "next"
import { getPublishedPosts } from "@/lib/notion"
import { PostGrid } from "@/components/post/post-grid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "인형공예 작품전시 블로그",
  description: "정성스럽게 만든 인형공예 작품들을 소개합니다. 소품, 의류, 액세서리 등 다양한 작품을 만나보세요.",
  openGraph: {
    title: "인형공예 작품전시 블로그",
    description: "정성스럽게 만든 인형공예 작품들을 소개합니다.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "인형공예 작품전시 블로그",
    description: "정성스럽게 만든 인형공예 작품들을 소개합니다.",
  },
}

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="mx-auto max-w-screen-2xl px-4 py-24 w-full">
        <div className="flex flex-col items-center text-center space-y-6">
          <p className="text-5xl">🪡</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              인형공예 작품전시
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              정성스럽게 만든 인형공예 작품들을 소개합니다.
              <br />
              소품, 의류, 액세서리 등 다양한 작품을 만나보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 작품 목록 섹션 */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-24 w-full">
        <PostGrid posts={posts} />
      </section>
    </div>
  )
}
