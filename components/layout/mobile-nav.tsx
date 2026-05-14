"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileNavProps {
  categories: string[]
}

export function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button
          className="p-1 hover:bg-muted rounded-md transition-colors"
          aria-label="메뉴 열기"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          <Link
            href="/"
            className="text-base font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            홈
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${encodeURIComponent(category)}`}
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
