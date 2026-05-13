// 환경변수 검증 및 타입 정의
// 서버 사이드에서만 사용되는 환경변수를 안전하게 관리합니다.

/**
 * 서버 환경변수 (서버 컴포넌트, API 라우트에서만 사용 가능)
 * 클라이언트 컴포넌트에서 이 변수들을 사용하면 빌드 에러 발생
 */
function getServerEnv() {
  const notionApiKey = process.env.NOTION_API_KEY
  const notionDatabaseId = process.env.NOTION_DATABASE_ID

  if (!notionApiKey) {
    throw new Error(
      "NOTION_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요."
    )
  }

  if (!notionDatabaseId) {
    throw new Error(
      "NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요."
    )
  }

  return {
    notionApiKey,
    notionDatabaseId,
  }
}

/**
 * 클라이언트에서도 접근 가능한 공개 환경변수 (NEXT_PUBLIC_ 접두사)
 */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "인형공예 작품전시",
}

/**
 * 서버 환경변수 획득 함수 (서버 컴포넌트에서 호출하여 사용)
 * 클라이언트 컴포넌트에서 임포트하면 빌드 에러 발생
 *
 * @example
 * const env = getServerEnvVars()
 * const client = new Client({ auth: env.notionApiKey })
 */
export { getServerEnv as getServerEnvVars }
