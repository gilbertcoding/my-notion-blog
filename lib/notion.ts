// Notion 데이터 페칭 함수 모음
// Notion REST API를 fetch로 직접 호출합니다.

import type { Post, PostSummary, PostStatus } from "./types/post"
import type { NotionPostProperties } from "./types/notion"
import { createSlug } from "./utils"
import { getServerEnvVars } from "./env"

const NOTION_API_BASE = "https://api.notion.com/v1"
const NOTION_VERSION = "2022-06-28"

// 페이지당 기본 표시 개수
export const POSTS_PER_PAGE = 12

// ─────────────────────────────────────────────────────────────────────────────
// 내부 헬퍼 함수
// ─────────────────────────────────────────────────────────────────────────────

function getNotionHeaders(): HeadersInit {
  const { notionApiKey } = getServerEnvVars()
  return {
    Authorization: `Bearer ${notionApiKey}`,
    "Notion-Version": NOTION_VERSION,
  }
}

interface NotionPage {
  id: string
  properties: NotionPostProperties
  created_time: string
  last_edited_time: string
}

async function queryDatabase(
  filter?: Record<string, unknown>,
  sorts?: Array<{ property: string; direction: "ascending" | "descending" }>
): Promise<NotionPage[]> {
  const { notionDatabaseId } = getServerEnvVars()

  try {
    const response = await fetch(
      `${NOTION_API_BASE}/databases/${notionDatabaseId}/query`,
      {
        method: "POST",
        headers: getNotionHeaders(),
        body: JSON.stringify({
          filter,
          sorts,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      if (process.env.NODE_ENV === "development") {
        console.error("Notion API 오류:", error)
      }
      return []
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Notion 쿼리 오류:", error)
    }
    return []
  }
}

function mapPageToPost(page: NotionPage): Post {
  const props = page.properties
  const title =
    props.Title?.type === "title" ? props.Title.title[0]?.plain_text ?? "" : ""
  const slug = createSlug(title)
  const materials =
    props.Materials?.type === "multi_select"
      ? props.Materials.multi_select.map((m) => m.name)
      : []
  const tags =
    props.Tags?.type === "multi_select"
      ? props.Tags.multi_select.map((t) => t.name)
      : []

  return {
    id: page.id,
    title,
    slug,
    category:
      props.Category?.type === "select" ? props.Category.select?.name ?? "" : "",
    imageUrl:
      props.ImageUrl?.type === "url" ? props.ImageUrl.url ?? "" : "",
    status:
      (props.Status?.type === "select"
        ? props.Status.select?.name
        : "") as PostStatus,
    description:
      props.Description?.type === "rich_text"
        ? props.Description.rich_text[0]?.plain_text
        : undefined,
    publishedAt:
      props.PublishedAt?.type === "date"
        ? props.PublishedAt.date?.start ?? ""
        : "",
    materials: materials.length > 0 ? materials : undefined,
    size:
      props.Size?.type === "rich_text"
        ? props.Size.rich_text[0]?.plain_text
        : undefined,
    price:
      props.Price?.type === "number" ? props.Price.number ?? undefined : undefined,
    tags: tags.length > 0 ? tags : undefined,
  }
}

function mapPageToPostSummary(page: NotionPage): PostSummary {
  const post = mapPageToPost(page)
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    imageUrl: post.imageUrl,
    description: post.description,
    publishedAt: post.publishedAt,
  }
}

interface RichTextElement {
  plain_text: string
}

interface BlockWithRichText {
  rich_text: RichTextElement[]
}

async function getPostContent(pageId: string): Promise<string> {
  try {
    const response = await fetch(
      `${NOTION_API_BASE}/blocks/${pageId}/children`,
      {
        headers: getNotionHeaders(),
      }
    )

    if (!response.ok) {
      return ""
    }

    const data = await response.json()
    const blocks = data.results || []

    const contentLines: string[] = []

    for (const block of blocks) {
      let line = ""

      if (block.type === "paragraph" && block.paragraph) {
        const richText = block.paragraph as BlockWithRichText
        line = richText.rich_text.map((t) => t.plain_text).join("")
      } else if (
        block.type === "heading_1" &&
        block.heading_1
      ) {
        const richText = block.heading_1 as BlockWithRichText
        const text = richText.rich_text
          .map((t) => t.plain_text)
          .join("")
        line = `# ${text}`
      } else if (
        block.type === "heading_2" &&
        block.heading_2
      ) {
        const richText = block.heading_2 as BlockWithRichText
        const text = richText.rich_text
          .map((t) => t.plain_text)
          .join("")
        line = `## ${text}`
      } else if (
        block.type === "heading_3" &&
        block.heading_3
      ) {
        const richText = block.heading_3 as BlockWithRichText
        const text = richText.rich_text
          .map((t) => t.plain_text)
          .join("")
        line = `### ${text}`
      } else if (
        block.type === "bulleted_list_item" &&
        block.bulleted_list_item
      ) {
        const richText = block.bulleted_list_item as BlockWithRichText
        const text = richText.rich_text
          .map((t) => t.plain_text)
          .join("")
        line = `- ${text}`
      } else if (
        block.type === "numbered_list_item" &&
        block.numbered_list_item
      ) {
        const richText = block.numbered_list_item as BlockWithRichText
        const text = richText.rich_text
          .map((t) => t.plain_text)
          .join("")
        line = `1. ${text}`
      }

      if (line) {
        contentLines.push(line)
      }
    }

    return contentLines.join("\n\n")
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("포스트 콘텐츠 조회 오류:", error)
    }
    return ""
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 공개 데이터 페칭 함수
// ─────────────────────────────────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<PostSummary[]> {
  const pages = await queryDatabase(
    {
      property: "Status",
      select: {
        equals: "발행됨",
      },
    },
    [
      {
        property: "PublishedAt",
        direction: "descending",
      },
    ]
  )

  return pages.map(mapPageToPostSummary)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const pages = await queryDatabase({
    property: "Status",
    select: {
      equals: "발행됨",
    },
  })

  const page = pages.find(
    (p) =>
      createSlug(
        p.properties.Title?.type === "title"
          ? p.properties.Title.title[0]?.plain_text ?? ""
          : ""
      ) === slug
  )

  if (!page) {
    return null
  }

  const post = mapPageToPost(page)
  post.content = await getPostContent(page.id)
  return post
}

export async function getPostsByCategory(
  category: string
): Promise<PostSummary[]> {
  const pages = await queryDatabase({
    and: [
      {
        property: "Status",
        select: {
          equals: "발행됨",
        },
      },
      {
        property: "Category",
        select: {
          equals: category,
        },
      },
    ],
  })

  return pages.map(mapPageToPostSummary)
}

export async function getCategories(): Promise<string[]> {
  const pages = await queryDatabase({
    property: "Status",
    select: {
      equals: "발행됨",
    },
  })

  const categories = new Set<string>()
  for (const page of pages) {
    const category =
      page.properties.Category?.type === "select"
        ? page.properties.Category.select?.name
        : undefined

    if (category) {
      categories.add(category)
    }
  }

  return Array.from(categories).sort()
}
