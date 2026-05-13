// Notion API 클라이언트 싱글톤
// @notionhq/client 패키지를 사용합니다.

import { Client } from "@notionhq/client"
import { getServerEnvVars } from "./env"

/**
 * Notion 클라이언트 싱글톤을 반환합니다.
 * 서버 컴포넌트 또는 서버 액션에서만 호출하세요.
 *
 * 사용법:
 *   import { getNotionClient } from "@/lib/notion-client"
 *
 *   const notion = getNotionClient()
 *   const response = await notion.databases.query({ ... })
 */
export function getNotionClient(): Client {
  const env = getServerEnvVars()
  return new Client({
    auth: env.notionApiKey,
  })
}
