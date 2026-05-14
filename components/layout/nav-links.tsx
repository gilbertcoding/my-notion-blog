"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

interface NavLinksProps {
  categories: string[]
}

export function NavLinks({ categories }: NavLinksProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
      <Link
        href="/"
        className={`transition-colors ${
          isActive("/") && pathname !== "/category" && pathname !== "/post"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        홈
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/category/${encodeURIComponent(category)}`}
          className={`transition-colors ${
            isActive(`/category/${encodeURIComponent(category)}`)
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {category}
        </Link>
      ))}
    </nav>
  )
}
