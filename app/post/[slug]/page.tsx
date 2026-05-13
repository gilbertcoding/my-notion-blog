import type { Metadata } from "next"

// 포스트 상세 페이지 props 타입
interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 동적 메타데이터 생성 (Phase 4에서 실제 Notion 데이터로 교체)
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params

  return {
    title: slug,
    description: "인형공예 작품 상세 페이지",
  }
}

// 포스트 상세 페이지 (Phase 3에서 Notion API 연동 후 구현)
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12">
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-lg border border-dashed border-border">
        <p className="text-4xl">🪡</p>
        <p className="text-lg font-medium">포스트 상세 페이지</p>
        <p className="text-sm text-muted-foreground">
          슬러그: <code className="font-mono bg-muted px-1 rounded">{slug}</code>
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Phase 3에서 Notion API 연동 후 실제 작품 정보가 표시됩니다.
        </p>
      </div>
    </div>
  )
}
