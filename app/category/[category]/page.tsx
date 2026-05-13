import type { Metadata } from "next"

// 카테고리 페이지 props 타입
interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// 동적 메타데이터 생성 (Phase 4에서 실제 Notion 데이터로 교체)
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} 카테고리`,
    description: `${decodedCategory} 카테고리의 인형공예 작품 목록`,
  }
}

// 카테고리 페이지 (Phase 3에서 Notion API 연동 후 구현)
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12">
      {/* 카테고리 헤더 */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold">{decodedCategory}</h1>
        <p className="mt-2 text-muted-foreground">
          {decodedCategory} 카테고리의 작품 목록
        </p>
      </div>

      {/* 작품 목록 (Phase 3에서 실제 데이터로 교체) */}
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-lg border border-dashed border-border">
        <p className="text-4xl">🧸</p>
        <p className="text-lg font-medium">
          {decodedCategory} 카테고리 준비 중
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Phase 3에서 Notion API 연동 후 해당 카테고리의 작품 목록이 표시됩니다.
        </p>
      </div>
    </div>
  )
}
