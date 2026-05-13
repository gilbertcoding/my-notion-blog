// 인형공예 작품 포스트 타입 정의
// Notion 데이터베이스 필드와 1:1 매핑

/**
 * 작품 포스트 기본 타입
 * Notion 데이터베이스의 각 행을 표현합니다.
 */
export interface Post {
  /** Notion 페이지 ID */
  id: string
  /** 작품 제목 */
  title: string
  /** URL에 사용되는 슬러그 (제목에서 생성) */
  slug: string
  /** 작품 카테고리 (소품, 의류, 액세서리 등) */
  category: string
  /** 작품 메인 이미지 URL */
  imageUrl: string
  /** 발행 상태 (초안 | 발행됨) */
  status: PostStatus
  /** 작품 짧은 설명 (150자 이내) */
  description?: string
  /** 작품 상세 설명 (본문) */
  content?: string
  /** 발행 날짜 */
  publishedAt: string
  /** 사용된 재료 목록 */
  materials?: string[]
  /** 작품 크기/규격 */
  size?: string
  /** 판매 가격 (선택사항) */
  price?: number
  /** 추가 태그 */
  tags?: string[]
}

/** 포스트 발행 상태 */
export type PostStatus = "초안" | "발행됨"

/**
 * 작품 카드 컴포넌트에 필요한 최소 데이터 타입
 * 목록 페이지에서 사용합니다.
 */
export type PostSummary = Pick<
  Post,
  "id" | "title" | "slug" | "category" | "imageUrl" | "description" | "publishedAt"
>
