// Notion API 응답 관련 타입 정의
// @notionhq/client 패키지의 응답 타입을 보완합니다.

/**
 * Notion 데이터베이스 페이지의 속성 타입
 * PRD에 정의된 데이터베이스 필드를 반영합니다.
 */
export interface NotionPostProperties {
  /** 작품 제목 (Title 타입) */
  Title: NotionTitleProperty
  /** 작품 카테고리 (Select 타입) */
  Category: NotionSelectProperty
  /** 작품 이미지 URL (Url 타입) */
  ImageUrl: NotionUrlProperty
  /** 발행 상태 (Select 타입: 초안 | 발행됨) */
  Status: NotionSelectProperty
  /** 짧은 설명 (Rich Text 타입) */
  Description: NotionRichTextProperty
  /** 발행 날짜 (Date 타입) */
  PublishedAt: NotionDateProperty
  /** 사용된 재료 (Multi-select 타입) */
  Materials: NotionMultiSelectProperty
  /** 작품 크기 (Rich Text 타입) */
  Size: NotionRichTextProperty
  /** 판매 가격 (Number 타입) */
  Price: NotionNumberProperty
  /** 태그 (Multi-select 타입) */
  Tags: NotionMultiSelectProperty
}

/** Notion Title 속성 타입 */
export interface NotionTitleProperty {
  type: "title"
  title: NotionRichTextItem[]
}

/** Notion Select 속성 타입 */
export interface NotionSelectProperty {
  type: "select"
  select: NotionSelectOption | null
}

/** Notion Multi-select 속성 타입 */
export interface NotionMultiSelectProperty {
  type: "multi_select"
  multi_select: NotionSelectOption[]
}

/** Notion Url 속성 타입 */
export interface NotionUrlProperty {
  type: "url"
  url: string | null
}

/** Notion Rich Text 속성 타입 */
export interface NotionRichTextProperty {
  type: "rich_text"
  rich_text: NotionRichTextItem[]
}

/** Notion Date 속성 타입 */
export interface NotionDateProperty {
  type: "date"
  date: {
    start: string
    end: string | null
    time_zone: string | null
  } | null
}

/** Notion Number 속성 타입 */
export interface NotionNumberProperty {
  type: "number"
  number: number | null
}

/** Notion Select 옵션 */
export interface NotionSelectOption {
  id: string
  name: string
  color: string
}

/** Notion Rich Text 아이템 */
export interface NotionRichTextItem {
  type: "text" | "mention" | "equation"
  text?: {
    content: string
    link: { url: string } | null
  }
  plain_text: string
  href: string | null
}
