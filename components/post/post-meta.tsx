// 작품 메타 정보 컴포넌트
// 상세 페이지에서 작품의 재료, 크기, 가격 등을 표시합니다.

import { CategoryBadge } from "@/components/common/category-badge"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatPrice } from "@/lib/utils"
import type { Post } from "@/lib/types/post"

// PostMeta 컴포넌트 props
interface PostMetaProps {
  post: Post
}

/**
 * 작품 상세 페이지의 메타 정보 컴포넌트
 * - 카테고리
 * - 발행 날짜
 * - 재료 목록
 * - 크기/규격
 * - 가격 (있는 경우)
 * - 태그
 */
export function PostMeta({ post }: PostMetaProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      {/* 카테고리 및 날짜 */}
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={post.category} />
        <span className="text-sm text-muted-foreground">
          {formatDate(post.publishedAt)}
        </span>
      </div>

      {/* 재료 목록 */}
      {post.materials && post.materials.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium">사용 재료</p>
          <div className="flex flex-wrap gap-1">
            {post.materials.map((material) => (
              <Badge key={material} variant="outline" className="text-xs">
                {material}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 크기/규격 */}
      {post.size && (
        <div className="space-y-1">
          <p className="text-sm font-medium">크기/규격</p>
          <p className="text-sm text-muted-foreground">{post.size}</p>
        </div>
      )}

      {/* 가격 */}
      {post.price !== undefined && post.price !== null && (
        <div className="space-y-1">
          <p className="text-sm font-medium">가격</p>
          <p className="text-base font-semibold text-primary">
            {formatPrice(post.price)}
          </p>
        </div>
      )}

      {/* 태그 */}
      {post.tags && post.tags.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium">태그</p>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
