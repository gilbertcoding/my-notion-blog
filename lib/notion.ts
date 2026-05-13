// Notion 데이터 페칭 함수 모음
// @notionhq/client를 통해 Notion API와 통신합니다.

import type { Post, PostSummary } from "./types/post"

// 페이지당 기본 표시 개수
export const POSTS_PER_PAGE = 12

// ─────────────────────────────────────────────────────────────────────────────
// 데이터 페칭 함수 (Phase 2에서 구현)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 발행된 모든 포스트 조회
 * - 정렬: PublishedAt (최신순)
 * - 필터: Status = "발행됨"
 *
 * @returns 포스트 목록 (최신순 정렬)
 */
export async function getPublishedPosts(): Promise<PostSummary[]> {
  // TODO: Phase 2 구현
  // const notion = getNotionClient()
  // const env = getServerEnvVars()
  // const response = await notion.databases.query({
  //   database_id: env.notionDatabaseId,
  //   filter: {
  //     property: "Status",
  //     select: { equals: "발행됨" },
  //   },
  //   sorts: [{ property: "PublishedAt", direction: "descending" }],
  // })
  // return response.results.map(transformToPostSummary)

  return []
}

/**
 * 슬러그로 특정 포스트 조회
 *
 * @param slug - 포스트 슬러그 (제목에서 생성)
 * @returns 포스트 상세 정보 또는 null
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // TODO: Phase 2 구현
  void slug
  return null
}

/**
 * 카테고리별 포스트 조회
 *
 * @param category - 카테고리명
 * @returns 해당 카테고리의 포스트 목록
 */
export async function getPostsByCategory(
  category: string
): Promise<PostSummary[]> {
  // TODO: Phase 2 구현
  void category
  return []
}

/**
 * 모든 카테고리 목록 조회
 *
 * @returns 중복 제거된 카테고리 목록
 */
export async function getCategories(): Promise<string[]> {
  // TODO: Phase 2 구현
  return []
}
