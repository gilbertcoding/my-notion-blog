import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

// 블로그 상단 네비게이션 바
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        {/* 로고 및 데스크탑 네비게이션 */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg">🪡</span>
            <span className="hidden font-bold sm:inline-block">
              인형공예 작품전시
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              홈
            </Link>
            <Link
              href="/category/소품"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              소품
            </Link>
            <Link
              href="/category/의류"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              의류
            </Link>
            <Link
              href="/category/액세서리"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              액세서리
            </Link>
          </nav>
        </div>

        {/* 테마 토글 */}
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
