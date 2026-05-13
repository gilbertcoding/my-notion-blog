// 페이지 관련 공통 타입 정의

/**
 * 페이지네이션 정보
 */
export interface Pagination {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number
  /** 전체 페이지 수 */
  totalPages: number
  /** 전체 아이템 수 */
  totalItems: number
  /** 페이지당 아이템 수 */
  itemsPerPage: number
  /** 이전 페이지 존재 여부 */
  hasPreviousPage: boolean
  /** 다음 페이지 존재 여부 */
  hasNextPage: boolean
}

/**
 * 페이지네이션이 포함된 데이터 응답 타입
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}
