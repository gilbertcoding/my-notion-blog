import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-6xl font-bold text-muted-foreground">404</p>
          <h1 className="text-3xl font-bold">페이지를 찾을 수 없습니다</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
