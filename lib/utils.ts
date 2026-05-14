import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind CSS 클래스명을 조합합니다.
 * shadcn/ui 패턴에서 사용하는 표준 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 제목에서 URL 슬러그를 생성합니다.
 * 한국어와 영문 모두 지원합니다.
 *
 * @param title - 작품 제목
 * @returns URL에 사용 가능한 슬러그
 *
 * @example
 * createSlug("유기농 펠트 인형") // → "유기농-펠트-인형"
 * createSlug("My First Doll") // → "my-first-doll"
 */
export function createSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")         // 공백을 하이픈으로 변환
    .replace(/[^\w가-힣-]/g, "") // 영문, 숫자, 한글, 하이픈만 허용
    .replace(/-+/g, "-")          // 연속 하이픈 정리
    .replace(/^-|-$/g, "")        // 앞뒤 하이픈 제거
}

/**
 * 날짜 문자열을 한국어 형식으로 포매팅합니다.
 *
 * @param dateString - ISO 날짜 문자열 (예: "2026-05-12")
 * @returns 한국어 날짜 문자열 (예: "2026년 5월 12일")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표를 추가합니다.
 *
 * @param text - 자를 텍스트
 * @param maxLength - 최대 길이 (기본값: 150)
 * @returns 잘린 텍스트 (필요시 "..." 추가)
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

/**
 * 가격을 한국 원화 형식으로 포매팅합니다.
 *
 * @param price - 가격 (숫자)
 * @returns 포매팅된 가격 문자열 (예: "15,000원")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원"
}
