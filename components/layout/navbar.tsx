import Link from "next/link"
import { getCategories } from "@/lib/notion"
import { ThemeToggle } from "./theme-toggle"
import { NavLinks } from "./nav-links"
import { MobileNav } from "./mobile-nav"
import { SearchBar } from "@/components/search/search-bar"

// 블로그 상단 네비게이션 바
export async function Navbar() {
  const categories = await getCategories()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        {/* 로고 및 데스크탑 네비게이션 */}
        <div className="mr-4 flex items-center flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg">🪡</span>
            <span className="hidden font-bold sm:inline-block">
              인형공예 작품전시
            </span>
          </Link>
          <NavLinks categories={categories} />
        </div>

        {/* 검색 + 테마 토글 + 모바일 메뉴 */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <ThemeToggle />
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  )
}
