import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// 카테고리 배지 컴포넌트 props
interface CategoryBadgeProps {
  /** 카테고리명 */
  category: string
  /** 클릭 시 카테고리 페이지로 이동 여부 (기본값: true) */
  linkable?: boolean
}

/**
 * 작품 카테고리를 표시하는 배지 컴포넌트
 * linkable이 true이면 카테고리 페이지 링크로 감쌉니다.
 */
export function CategoryBadge({
  category,
  linkable = true,
}: CategoryBadgeProps) {
  const badge = (
    <Badge variant="secondary" className="text-xs">
      {category}
    </Badge>
  )

  if (!linkable) return badge

  return (
    <Link
      href={`/category/${encodeURIComponent(category)}`}
      className="hover:opacity-80 transition-opacity"
    >
      {badge}
    </Link>
  )
}
