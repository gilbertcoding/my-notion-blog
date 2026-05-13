// 작품 그리드 컴포넌트
// 반응형 그리드로 PostCard를 배열 렌더링합니다.

import { PostCard } from "./post-card"
import type { PostSummary } from "@/lib/types/post"

// PostGrid 컴포넌트 props
interface PostGridProps {
  posts: PostSummary[]
}

/**
 * 작품 목록을 반응형 그리드로 표시하는 컴포넌트
 * - 모바일: 1열
 * - 태블릿: 2열
 * - 데스크탑: 3열
 */
export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-lg border border-dashed border-border">
        <span className="text-4xl">🧸</span>
        <p className="text-lg font-medium">아직 등록된 작품이 없습니다</p>
        <p className="text-sm text-muted-foreground">
          곧 새로운 작품을 선보이겠습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
