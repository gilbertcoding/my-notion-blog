// 블로그 하단 푸터
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 max-w-screen-2xl">
        {/* 사이트 소개 */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-sm font-medium flex items-center gap-1">
            <span>🪡</span>
            <span>인형공예 작품전시</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Notion을 CMS로 활용한 작품전시 블로그
          </p>
        </div>

        {/* 저작권 */}
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} 인형공예 작품전시. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
