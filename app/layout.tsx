import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "인형공예 작품전시 블로그",
    template: "%s | 인형공예 작품전시",
  },
  description: "Notion을 CMS로 활용하여 인형공예 작품을 전시하고 관리하는 블로그 플랫폼입니다.",
  metadataBase: new URL("https://my-notion-blog.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://my-notion-blog.vercel.app",
    title: "인형공예 작품전시 블로그",
    description: "정성스럽게 만든 인형공예 작품들을 소개합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "인형공예 작품전시 블로그",
    description: "정성스럽게 만든 인형공예 작품들을 소개합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
