// 작품 카드 컴포넌트
// Phase 2에서 실제 PostSummary 데이터를 받아 렌더링하도록 구현 예정

import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CategoryBadge } from "@/components/common/category-badge"
import { formatDate, truncateText } from "@/lib/utils"
import type { PostSummary } from "@/lib/types/post"

// PostCard 컴포넌트 props
interface PostCardProps {
  post: PostSummary
}

/**
 * 작품 목록에서 사용하는 카드 컴포넌트
 * - 썸네일 이미지
 * - 카테고리 배지
 * - 작품 제목
 * - 짧은 설명
 * - 발행 날짜
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:border-border">
        {/* 썸네일 이미지 */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // 이미지 없을 때 플레이스홀더
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl">🧸</span>
            </div>
          )}
        </div>

        <CardHeader className="space-y-2 pb-2">
          {/* 카테고리 배지 */}
          <CategoryBadge category={post.category} linkable={false} />

          {/* 작품 제목 */}
          <CardTitle className="text-base leading-tight line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>

        {post.description && (
          <CardContent className="pt-0 pb-4">
            {/* 짧은 설명 */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {truncateText(post.description, 80)}
            </p>
          </CardContent>
        )}

        {/* 발행 날짜 */}
        <CardContent className="pt-0 pb-4">
          <p className="text-xs text-muted-foreground">
            {formatDate(post.publishedAt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
