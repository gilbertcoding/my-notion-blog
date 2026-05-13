# 인형공예 작품전시 블로그 - 개발 표준 가이드

**목적**: AI Agent를 위한 프로젝트 특정 규칙 및 제약사항 정의

**최종 수정**: 2026-05-13
**버전**: 1.0
**상태**: 활성화

---

## 1. 프로젝트 개요

### 프로젝트명
인형공예 작품전시 블로그 (Doll Craft Exhibition Blog)

### 프로젝트 목적
Notion을 CMS(Content Management System)로 활용하여 인형공예 작품을 전시하고 관리하는 현대적인 블로그 플랫폼

### 핵심 기술 스택
| 계층 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **프레임워크** | Next.js | 15.5.2 | SSG/ISR 기반 정적 사이트 생성 |
| **언어** | TypeScript | 5.x | 타입 안정성 |
| **런타임** | React | 19.1.0 | UI 컴포넌트 |
| **번들러** | Turbopack | - | 빌드 최적화 |
| **스타일** | Tailwind CSS | 4.1.13 | CSS 유틸리티 (CSS 기반 설정, 변수) |
| **UI 컴포넌트** | shadcn/ui | - | New York 스타일, RSC 활성화 |
| **아이콘** | Lucide React | 0.543.0 | SVG 아이콘 라이브러리 |
| **테마** | next-themes | 0.4.6 | 다크/라이트 모드 관리 |
| **CMS** | Notion API | 5.21.0 | 콘텐츠 저장소 |
| **배포** | Vercel | - | Next.js 최적화 호스팅 |

### 배포 전략
- **SSG (Static Site Generation)**: 빌드 타임에 모든 페이지 사전 생성
- **ISR (Incremental Static Regeneration)**: Notion 데이터 변경 시 최대 1시간 이내 자동 재생성
- **호스팅**: Vercel (Next.js 최적화, 자동 배포)

### 개발 언어 규칙 (CLAUDE.md 준수)
- **코드** (변수명, 함수명, 클래스명): 영어 (camelCase, PascalCase)
- **주석**: 한국어
- **문서**: 한국어 (README, ROADMAP, PRD 등)
- **커밋 메시지**: 한국어

---

## 2. 프로젝트 구조

```
my-notion-blog/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (ThemeProvider, Navbar, Footer)
│   ├── page.tsx                 # 홈 페이지 (작품 목록)
│   ├── globals.css              # 전역 스타일 (@theme inline)
│   ├── post/
│   │   └── [slug]/
│   │       └── page.tsx         # 포스트 상세 페이지 (SSG + generateStaticParams)
│   └── category/
│       └── [category]/
│           └── page.tsx         # 카테고리 필터링 페이지
├── components/                   # React 컴포넌트
│   ├── layout/
│   │   ├── navbar.tsx           # 상단 네비게이션 (로고, 테마 토글)
│   │   └── footer.tsx           # 푸터 (저작권, 링크)
│   ├── post/
│   │   ├── post-card.tsx        # 작품 카드 컴포넌트
│   │   ├── post-grid.tsx        # 작품 그리드 레이아웃
│   │   └── post-meta.tsx        # 메타 정보 표시
│   ├── common/
│   │   └── category-badge.tsx   # 카테고리 배지
│   ├── ui/                      # shadcn/ui 컴포넌트 (자동 생성)
│   └── providers/
│       └── theme-provider.tsx   # next-themes 래퍼
├── lib/                         # 유틸리티 및 헬퍼
│   ├── utils.ts                 # 유틸리티 함수 (cn, createSlug, formatDate 등)
│   ├── env.ts                   # 환경 변수 검증
│   ├── notion-client.ts         # Notion API 클라이언트 싱글톤
│   ├── notion.ts                # 데이터 페칭 함수 (getPublishedPosts 등)
│   └── types/
│       ├── notion.ts            # Notion API 응답 타입
│       ├── post.ts              # 포스트 도메인 타입 (Post, PostSummary)
│       └── page.ts              # 페이지 컴포넌트 Props 타입
├── docs/                        # 프로젝트 문서
│   ├── PRD.md                   # 프로덕션 요구사항 정의
│   └── ROADMAP.md               # 개발 로드맵
├── public/                      # 정적 자산 (이미지, 폰트 등)
├── .env.example                 # 환경 변수 템플릿
├── .env.local                   # 실제 환경 변수 (git ignored)
├── next.config.ts               # Next.js 설정 (remotePatterns)
├── tsconfig.json                # TypeScript 설정 (strict: true)
├── components.json              # shadcn/ui 설정
├── package.json                 # NPM 의존성
├── CLAUDE.md                    # 프로젝트 개발 지침
└── shrimp-rules.md             # AI Agent 개발 표준 (이 파일)
```

---

## 3. 코드 표준

### 3.1 파일 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| **파일명** | kebab-case | `post-card.tsx`, `notion-client.ts`, `env.ts` |
| **디렉토리명** | kebab-case | `components/`, `lib/types/` |
| **함수/변수명** | camelCase | `createSlug`, `formatDate`, `getPublishedPosts` |
| **상수명** | UPPER_SNAKE_CASE | `DEFAULT_ISR_REVALIDATE = 3600` |
| **컴포넌트명** | PascalCase | `PostCard`, `PostGrid`, `CategoryBadge` |
| **타입/인터페이스명** | PascalCase | `Post`, `NotionPage`, `PageProps` |

### 3.2 들여쓰기 및 포맷팅
- **들여쓰기**: 2칸 (스페이스, 탭 아님)
- **줄 길이**: 100자 이내 권장 (필수 아님)
- **세미콜론**: 필수
- **따옴표**: 더블 쿼트 (`"`) 우선 (React JSX 속성), 싱글 쿼트 (`'`) 가능
- **Prettier**: 프로젝트 설정 준수

### 3.3 주석 및 문서화

**주석은 한국어로 작성** — "왜(WHY)"가 명확하지 않으면 작성

```typescript
// ❌ 나쁜 예: 코드와 중복
const result = arr.filter(x => x > 10)  // 10보다 큰 값 필터링

// ✅ 좋은 예: 이유 설명
// Notion 내부 URL은 1시간 후 만료되므로 외부 스토리지에서만 로드
const imageUrl = await fetchFromCloudinary(itemId)

// ✅ 좋은 예: 비명백한 제약 조건
// Phase 1에서 SSG로 생성하고 ISR로 갱신하기 위해 slug 기반 정렬 필수
const posts = await getPostBySlug(slug)
```

**JSDoc 스타일 — 함수 목적이 명확하면 불필요**

```typescript
// ✅ 필요한 경우만
/**
 * Notion 페이지를 Post 타입으로 변환합니다.
 * 필터 (Status = "발행됨")를 자동으로 적용합니다.
 *
 * @param page - Notion 페이지 객체
 * @returns 변환된 Post 객체 (또는 조건 불일치 시 null)
 */
function transformNotionPageToPost(page: NotionPage): Post | null { ... }
```

---

## 4. TypeScript 엄격성

### 필수 설정 (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,              // 모든 엄격한 타입 체크 활성화
    "noImplicitAny": true,        // any 타입 암묵적 사용 금지
    "noImplicitThis": true,       // this 타입 암묵적 any 금지
    "strictNullChecks": true,     // null/undefined 엄격 체크
    "strictFunctionTypes": true   // 함수 타입 엄격 체크
  }
}
```

### 타입 안정성 규칙

| 규칙 | 설명 | 예시 |
|------|------|------|
| **any 금지** | 모든 `any` 사용 금지 | ❌ `const data: any = response` |
| **unknown 사용** | 타입 불확실 시 `unknown` 사용 | ✅ `const data: unknown = response` |
| **제네릭 활용** | 재사용 가능한 함수는 제네릭 | ✅ `function map<T>(arr: T[]): T[]` |
| **유니온 타입** | 여러 타입 가능 시 | ✅ `const value: string \| null = ...` |
| **타입 가드** | 런타임 타입 체크 | ✅ `if (typeof x === "string") { ... }` |

### 에러 처리
```typescript
// ❌ 나쁜 예
const response = await fetch(url)
const data = response.json() // 타입 체크 없음

// ✅ 좋은 예
const response = await fetch(url)
if (!response.ok) {
  console.error(`Failed: ${response.statusText}`)
  return []
}
const data: unknown = await response.json()
if (data && typeof data === "object" && "items" in data) {
  return data.items as Post[]
}
return []
```

---

## 5. 컴포넌트 개발 표준

### 5.1 shadcn/ui 활용 규칙

**설정 기준** (components.json)
- **스타일**: New York (명확한 선 기반)
- **RSC 활성화**: `true` (React Server Components)
- **css 변수**: `true` (Tailwind CSS 변수 기반)

**컴포넌트 추가**
```bash
npx shadcn@latest add button    # 예: Button 컴포넌트 추가
npx shadcn@latest add badge     # 예: Badge 컴포넌트 추가
```

### 5.2 서버/클라이언트 컴포넌트 구분

| 구분 | 규칙 | 예시 |
|------|------|------|
| **기본값** | 서버 컴포넌트 | 데이터 페칭, 메타데이터 생성 |
| **`"use client"`** | 최소화 | 상호작용 필요 시만 (테마 토글, 폼 등) |
| **권장** | 서버 → 클라이언트 | 부모는 서버, 자식에만 `"use client"` |

```typescript
// ✅ 좋은 예: 대부분 서버 컴포넌트
export default async function PostPage() {
  const posts = await getPublishedPosts()
  return <PostGrid posts={posts} />  // 클라이언트 래퍼 불필요
}

// ❌ 나쁜 예: 불필요한 클라이언트 컴포넌트
"use client"
export default function HomePage() {
  const posts = await getPublishedPosts()  // ❌ 클라이언트에서 API 호출 불가
}
```

### 5.3 스타일링 패턴

**cn() 유틸리티** — shadcn/ui 표준 패턴

```typescript
import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition",
        variant === "primary" && "bg-blue-600 text-white",
        variant === "secondary" && "bg-gray-200 text-gray-800",
        size === "sm" && "px-2 py-1 text-sm",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  )
}
```

### 5.4 반응형 디자인 (필수)

**Tailwind CSS 반응형 브레이크포인트**
```typescript
export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    // ✅ 필수: 모든 컴포넌트는 반응형
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
```

**기본 브레이크포인트**
- `sm`: 640px (모바일 → 태블릿)
- `md`: 768px (태블릿)
- `lg`: 1024px (데스크탑)
- `xl`: 1280px (큰 데스크탑)

### 5.5 다크 모드 지원 (필수)

**next-themes 사용**
```typescript
// ✅ Tailwind dark 클래스 사용
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️ 라이트" : "🌙 다크"}
    </button>
  )
}

// ✅ 컴포넌트에서 다크 모드 색상
<div className="bg-white dark:bg-slate-950 text-black dark:text-white">
  콘텐츠
</div>
```

---

## 6. 데이터 페칭 표준

### 6.1 페칭 함수 위치

**모든 데이터 페칭은 `lib/notion.ts`에 정의**

```typescript
// lib/notion.ts
export async function getPublishedPosts(): Promise<Post[]> { ... }
export async function getPostBySlug(slug: string): Promise<Post | null> { ... }
export async function getPostsByCategory(category: string): Promise<Post[]> { ... }
export async function getCategories(): Promise<string[]> { ... }
```

**페이지에서 사용**
```typescript
// app/page.tsx
import { getPublishedPosts } from "@/lib/notion"

export default async function HomePage() {
  const posts = await getPublishedPosts()  // ✅ lib/notion.ts 함수 사용
  return <PostGrid posts={posts} />
}
```

### 6.2 서버 컴포넌트에서만 호출

```typescript
// ✅ 좋은 예: 서버 컴포넌트
export default async function PostPage() {
  const posts = await getPublishedPosts()
  return <div>{posts.length} 작품</div>
}

// ❌ 나쁜 예: 클라이언트 컴포넌트에서 호출 불가
"use client"
export function PostList() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPublishedPosts()  // ❌ 클라이언트에서 서버 함수 호출 불가
  }, [])
}
```

### 6.3 에러 핸들링 및 Graceful Degradation

```typescript
// lib/notion.ts
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      filter: { property: "Status", select: { equals: "발행됨" } },
      sorts: [{ property: "PublishedAt", direction: "descending" }],
    })
    return response.results.map(transformNotionPageToPost).filter(isNotNull)
  } catch (error) {
    console.error("Failed to fetch posts from Notion:", error)
    return []  // ✅ 에러 시 빈 배열 반환
  }
}
```

### 6.4 ISR 설정

**모든 동적 페이지는 ISR 활성화**

```typescript
// app/post/[slug]/page.tsx
export const revalidate = 3600  // ✅ 1시간 후 자동 재생성

// app/page.tsx
export const revalidate = 3600  // ✅ 1시간 후 자동 재생성

// 특정 경로만 On-Demand Revalidation 필요 시
export async function POST() {
  revalidatePath("/")
  revalidatePath("/post/[slug]", "page")
  return { revalidated: true }
}
```

---

## 7. Notion API 연동 표준

### 7.1 환경 변수 관리

**`.env.local` 파일 (git ignored)**
```bash
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**`.env.example` (버전 관리)**
```bash
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

**`lib/env.ts` (검증)**
```typescript
// lib/env.ts
function getEnvVariable(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const env = {
  notionApiKey: getEnvVariable("NOTION_API_KEY"),
  notionDatabaseId: getEnvVariable("NOTION_DATABASE_ID"),
}
```

### 7.2 API 클라이언트 싱글톤

```typescript
// lib/notion-client.ts
import { Client } from "@notionhq/client"
import { env } from "./env"

export const notionClient = new Client({ auth: env.notionApiKey })
```

**사용 규칙**
- ✅ `notionClient`는 싱글톤 (중복 생성 금지)
- ✅ `lib/notion.ts`에서만 사용
- ❌ 페이지/컴포넌트에서 직접 `new Client()` 생성 금지

### 7.3 데이터베이스 필드 매핑

**Notion 필드 ↔ TypeScript 타입 매핑**

| Notion 필드 | 타입 | TypeScript 타입 |
|-------------|------|-----------------|
| **Title** | Title | `string` |
| **Category** | Select | `string` |
| **ImageUrl** | URL | `string` |
| **Status** | Select | `"초안" \| "발행됨"` |
| **Description** | Text | `string` |
| **Content** | Rich Text | `RichText[]` (또는 `string` 변환) |
| **PublishedAt** | Date | `string` (ISO 형식) |
| **Materials** | Multi-select | `string[]` |
| **Size** | Text | `string` |
| **Price** | Number | `number` |
| **Tags** | Multi-select | `string[]` |

**타입 정의** (`lib/types/post.ts`)
```typescript
export interface Post {
  id: string
  slug: string              // URL 안전 식별자
  title: string             // Notion Title
  category: string          // Notion Category
  imageUrl: string          // Notion ImageUrl (외부 URL)
  status: "초안" | "발행됨"  // Notion Status
  description: string       // Notion Description
  content: string           // Notion Content (렌더링된 HTML/마크다운)
  publishedAt: string       // ISO 날짜 (2026-05-13)
  materials?: string[]      // Notion Materials
  size?: string             // Notion Size
  price?: number            // Notion Price
  tags?: string[]           // Notion Tags
}
```

### 7.4 Rich Text 렌더링

**Notion Rich Text → HTML 변환**

```typescript
// lib/notion.ts (또는 별도 lib/markdown.ts)
import { NotionToMarkdown } from "notion-to-md/build/index.js"

const n2m = new NotionToMarkdown()

export async function renderNotionContent(blockId: string): Promise<string> {
  try {
    const blocks = await notionClient.blocks.children.list({ block_id: blockId })
    const markdown = await n2m.blocksToMarkdown(blocks.results)
    return markdown.parent  // 마크다운 문자열
  } catch (error) {
    console.error("Failed to render content:", error)
    return ""
  }
}
```

**또는 커스텀 렌더러 사용** (가벼운 구현)
```typescript
function renderRichText(richTextArray: RichTextItemResponse[]): string {
  return richTextArray.map(text => text.plain_text).join("")
}
```

### 7.5 쿼리 필터 및 정렬

**발행된 포스트만 조회** (필수)

```typescript
// lib/notion.ts
const response = await notionClient.databases.query({
  database_id: env.NOTION_DATABASE_ID,
  filter: {
    property: "Status",
    select: { equals: "발행됨" }
  },
  sorts: [
    { property: "PublishedAt", direction: "descending" }  // 최신순
  ]
})
```

**카테고리 필터**
```typescript
const response = await notionClient.databases.query({
  database_id: env.NOTION_DATABASE_ID,
  filter: {
    and: [
      { property: "Status", select: { equals: "발행됨" } },
      { property: "Category", select: { equals: category } }
    ]
  }
})
```

### 7.6 Rate Limiting 대응

**Notion API 제한**: 3 requests per second (RPS)

**대응 방법**
- ✅ ISR 캐싱으로 빌드 타임 API 호출 최소화
- ✅ 배치 쿼리 활용 (페이지당 100개 조회)
- ✅ 요청 간 지연 추가 (필요 시)

```typescript
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getAllPosts() {
  const posts: Post[] = []
  let cursor: string | undefined = undefined
  
  while (true) {
    const response = await notionClient.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      start_cursor: cursor
    })
    
    posts.push(...response.results.map(transformNotionPageToPost))
    
    if (!response.has_more) break
    cursor = response.next_cursor || undefined
    await sleep(100)  // Rate limit 대응
  }
  
  return posts
}
```

---

## 8. 이미지 및 정적 자산 처리

### 8.1 원격 이미지 허용 도메인 (next.config.ts)

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
      {
        protocol: "https",
        hostname: "**.notion.site",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // 필요시 추가: Imgix, AWS S3, Google Cloud Storage 등
    ],
  },
}
```

### 8.2 Next.js Image 컴포넌트 사용 (필수)

```typescript
import Image from "next/image"

// ✅ 좋은 예: width/height 지정
<Image
  src={imageUrl}
  alt={title}
  width={400}
  height={300}
  className="rounded-lg object-cover"
  priority={isBelowFold}
/>

// ❌ 나쁜 예: <img> 태그 사용 금지
<img src={imageUrl} alt={title} />
```

**props 필수**
- `src`: 이미지 URL
- `alt`: 접근성 설명 (한국어)
- `width` + `height`: 픽셀 단위 (정적) 또는 `fill` (동적)
- `className`: 스타일 (필요시)
- `priority`: 초기 로드 이미지 (히어로 섹션)

### 8.3 이미지 저장소 선택

**금지 사항**
- ❌ Notion 내부 이미지 URL (1시간 후 만료)
- ❌ 로컬 파일 (빌드 시 압축/최적화 필요)

**권장 외부 스토리지**
| 서비스 | 용도 | 가격 | 비고 |
|--------|------|------|------|
| **Cloudinary** | 이미지 최적화 | 무료/유료 | CDN, 자동 최적화 |
| **AWS S3** | 파일 저장 | 종량제 | 대용량 이미지 |
| **Imgix** | CDN 제공 | 유료 | 실시간 최적화 |
| **Google Cloud Storage** | 파일 저장 | 종량제 | GCP 통합 |

**Notion 이미지 외부화**
```typescript
// Notion에서 이미지 다운로드 후 Cloudinary 업로드
// → ImageUrl 필드에 외부 URL 저장 (1시간 만료 방지)
```

---

## 9. SEO 및 메타데이터

### 9.1 동적 메타데이터 생성

**홈 페이지** (`app/page.tsx`)
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "인형공예 작품전시 블로그",
    description: "Notion을 CMS로 활용하여 인형공예 작품을 전시합니다.",
    openGraph: {
      title: "인형공예 작품전시 블로그",
      description: "Notion을 CMS로 활용하여 인형공예 작품을 전시합니다.",
      url: "https://yourdomain.com",
      type: "website",
    },
  }
}
```

**포스트 상세 페이지** (`app/post/[slug]/page.tsx`)
```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: "404 - Not Found" }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://yourdomain.com/post/${post.slug}`,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
  }
}
```

### 9.2 Sitemap 생성 (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from "next"
import { getPublishedPosts, getCategories } from "@/lib/notion"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts()
  const categories = await getCategories()

  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map(post => ({
      url: `https://yourdomain.com/post/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categories.map(category => ({
      url: `https://yourdomain.com/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]
}
```

### 9.3 Robots.txt (`app/robots.ts`)

```typescript
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  }
}
```

---

## 10. 환경 변수 및 보안

### 10.1 환경 변수 분류

| 변수 | 위치 | 보안 | 용도 |
|------|------|------|------|
| `NOTION_API_KEY` | `.env.local` (서버 전용) | 🔒 비밀 | Notion API 인증 |
| `NOTION_DATABASE_ID` | `.env.local` (서버 전용) | 🟡 반공개 | Notion 데이터베이스 ID |
| `NEXT_PUBLIC_*` | `.env.local` | ⚠️ 공개 | 클라이언트 노출 용도 |

### 10.2 보안 규칙

| 규칙 | 이유 |
|------|------|
| **API 키는 `.env.local`만** | git에 커밋되지 않음 |
| **Vercel에서 명시적 설정** | 환경별 다른 키 사용 가능 |
| **`"use client"` 컴포넌트에서 import 불가** | 클라이언트 번들에 노출 안 됨 |
| **API 엔드포인트 불필요** | 서버 컴포넌트에서 직접 호출 |

### 10.3 환경 변수 검증

```typescript
// lib/env.ts
export const env = {
  notionApiKey: getEnvVariable("NOTION_API_KEY"),
  notionDatabaseId: getEnvVariable("NOTION_DATABASE_ID"),
} as const

// 빌드 타임 검증
if (!env.notionApiKey || !env.notionDatabaseId) {
  throw new Error("Missing required environment variables")
}
```

---

## 11. 다중 파일 수정 규칙

### 11.1 유틸리티 함수 추가

**수정할 파일**
- `lib/utils.ts` - 함수 구현
- `lib/types/page.ts` - 필요시 반환 타입 추가

**예시: `createSlug` 함수 추가 시**
```
1. lib/utils.ts에 함수 구현
2. 함수 사용처에서 import { createSlug } from "@/lib/utils"
3. 테스트 (로컬 dev 서버에서 동작 확인)
```

### 11.2 새로운 페이지 추가

**수정할 파일**
1. `app/[new-page]/page.tsx` - 새 페이지 생성
2. `lib/types/page.ts` - Props 타입 추가 (필요시)
3. `lib/notion.ts` - 데이터 페칭 함수 추가 (필요시)
4. `app/sitemap.ts` - sitemap 업데이트
5. `app/robots.ts` - robots 업데이트 (필요시)
6. `components/layout/navbar.tsx` - 네비게이션 링크 추가 (필요시)

**예시: `/search` 페이지 추가 시**
```
1. app/search/page.tsx 생성
2. lib/notion.ts에 searchPosts() 함수 추가
3. app/sitemap.ts에 /search 경로 추가
4. lib/types/page.ts에 SearchPageProps 추가
5. components/layout/navbar.tsx에 검색 링크 추가
```

### 11.3 Notion 필드 추가

**수정할 파일**
1. Notion 데이터베이스에 필드 추가 (UI)
2. `lib/types/notion.ts` - Notion API 응답 타입 수정
3. `lib/types/post.ts` - Post 인터페이스 필드 추가
4. `lib/notion.ts` - 변환 함수 업데이트
5. 필요한 페이지/컴포넌트 - 필드 표시 로직 추가

**예시: `Author` (텍스트) 필드 추가 시**
```
1. Notion DB에 Author 필드 추가 (Text)
2. lib/types/notion.ts: NotionPageProperties에 author 추가
3. lib/types/post.ts: Post 인터페이스에 author?: string 추가
4. lib/notion.ts: transformNotionPageToPost에 author 매핑 추가
5. components/post/post-meta.tsx: author 표시 로직 추가
6. app/post/[slug]/page.tsx: 필요시 author 표시
```

### 11.4 환경 변수 추가

**수정할 파일**
1. `.env.example` - 새 변수 설명
2. `.env.local` - 실제 값 입력
3. `lib/env.ts` - 검증 로직 추가

**예시: `NEXT_PUBLIC_SITE_URL` 추가 시**
```
1. .env.example: NEXT_PUBLIC_SITE_URL=https://example.com
2. .env.local: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
3. lib/env.ts: export const siteUrl = getEnvVariable("NEXT_PUBLIC_SITE_URL")
```

### 11.5 컴포넌트 추가

**수정할 파일**
1. `components/[category]/[component-name].tsx` - 컴포넌트 생성
2. `lib/types/page.ts` - Props 타입 추가
3. 사용하는 페이지/부모 컴포넌트 - import 및 사용

**예시: `SearchInput` 컴포넌트 추가 시**
```
1. components/common/search-input.tsx 생성
2. lib/types/page.ts에 SearchInputProps 타입 추가
3. components/layout/navbar.tsx에서 import 및 사용
```

---

## 12. 배포 및 성능 최적화

### 12.1 빌드 프로세스

**로컬 빌드 (개발자)**
```bash
npm run build --turbopack     # Turbopack으로 빌드
npm run start                  # 프로덕션 서버 실행
```

**Vercel 자동 배포**
- `main` 브랜치 푸시 시 자동 배포
- 빌드 로그 확인: Vercel Dashboard
- 환경 변수: Vercel Settings → Environment Variables

### 12.2 성능 목표

| 항목 | 목표 | 도구 |
|------|-----|------|
| **빌드 시간** | < 30초 | `npm run build` 출력 |
| **페이지 로드** | < 2초 | Chrome DevTools, Vercel Analytics |
| **Lighthouse Performance** | ≥ 90 | PageSpeed Insights |
| **Lighthouse Accessibility** | ≥ 95 | PageSpeed Insights |
| **Lighthouse SEO** | ≥ 95 | PageSpeed Insights |

### 12.3 최적화 체크리스트

- [ ] 모든 이미지는 Next.js `Image` 컴포넌트 사용
- [ ] `priority` prop으로 초기 로드 이미지 지정
- [ ] 불필요한 `"use client"` 제거
- [ ] 번들 크기 확인 (`npm run build` 출력)
- [ ] ISR revalidate 설정 확인 (1시간)
- [ ] 콘솔 에러 0개

### 12.4 배포 후 검증 체크리스트

- [ ] 홈 페이지 접속 및 작품 목록 표시 확인
- [ ] 포스트 상세 페이지 접속 및 데이터 표시 확인
- [ ] 카테고리 필터링 동작 확인
- [ ] 라이트/다크 모드 전환 동작 확인
- [ ] 이미지 로딩 정상 (깨진 이미지 없음)
- [ ] 모바일(375px) 레이아웃 확인
- [ ] 태블릿(768px) 레이아웃 확인
- [ ] 데스크탑(1200px) 레이아웃 확인
- [ ] 콘솔 에러 0개
- [ ] Lighthouse 점수 목표 달성

---

## 13. 금지 사항 및 안티패턴

### 13.1 코드 레벨 금지

| 금지 사항 | 이유 | 대체 방안 |
|----------|------|---------|
| **`any` 타입** | 타입 안정성 상실 | `unknown`, 제네릭, 유니온 타입 |
| **`as any` 타입 강제 변환** | 타입 체크 우회 | 제대로 된 타입 정의 |
| **직접 Notion API 호출** | 일관성 상실 | `lib/notion.ts` 함수 사용 |
| **클라이언트에서 API 호출** | 보안 위험 (API 키 노출) | 서버 컴포넌트 또는 API 라우트 |
| **하드코딩된 설정값** | 배포 어려움 | 환경 변수 사용 |
| **`console.log` 조건 없이** | 프로덕션 로그 오염 | 에러만 로깅, 개발 시에만 |

### 13.2 구조 레벨 금지

| 금지 사항 | 이유 | 권장 방법 |
|----------|------|---------|
| **3단계 이상 중첩 컴포넌트** | 복잡도 증가, 유지보수 어려움 | 컴포넌트 분리 |
| **전역 상태 남용** | 불필요한 복잡성 | Props drilling, Context (필요시) |
| **CSS-in-JS 혼용** | Tailwind CSS와 충돌 | Tailwind CSS만 사용 |
| **Notion 내부 이미지 URL** | 1시간 후 만료 | 외부 스토리지 사용 |
| **`<img>` 태그** | 최적화 불가 | Next.js `Image` 컴포넌트 |

### 13.3 배포 레벨 금지

| 금지 사항 | 이유 | 권장 방법 |
|----------|------|---------|
| **`.env.local` git 커밋** | 민감 정보 노출 | `.gitignore`에 추가, `.env.example` 사용 |
| **Vercel 환경 변수 미설정** | 배포 후 API 호출 실패 | Vercel Dashboard에서 명시 |
| **프로덕션에서 미검증** | 사용자 영향 | 배포 후 전체 페이지 테스트 |

### 13.4 패턴 금지

❌ **나쁜 패턴 1: 클라이언트에서 데이터 페칭**
```typescript
"use client"
export function HomePage() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("/api/posts").then(...)  // ❌ 복잡, 느림
  }, [])
}
```

✅ **좋은 패턴**: 서버 컴포넌트 사용
```typescript
import { getPublishedPosts } from "@/lib/notion"

export default async function HomePage() {
  const posts = await getPublishedPosts()
  return <PostGrid posts={posts} />  // ✅ 빠름, 간단
}
```

---

## 14. 개발 명령어

### 개발 환경

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 검사
npm run lint

# 프로덕션 빌드 (로컬)
npm run build

# 프로덕션 서버 실행
npm run start

# shadcn/ui 컴포넌트 추가
npx shadcn@latest add button
```

### Git 커밋 메시지

**형식** (한국어, ROADMAP 단계 포함)
```
[Phase X] 기능 또는 변경사항 설명

상세 설명 (필요시)
```

**예시**
```
[Phase 1] Notion 환경 변수 검증 추가

lib/env.ts에서 빌드 타임 검증 로직 구현
누락된 환경 변수 시 명확한 에러 메시지 출력
```

---

## 15. 참고 및 의존성

### 중요 파일
- **PRD**: `docs/PRD.md` - 프로덕션 요구사항
- **ROADMAP**: `docs/ROADMAP.md` - 개발 일정 및 단계
- **CLAUDE.md**: 프로젝트 개발 지침 (한국어 주석, 영어 코드 등)

### 외부 문서
- [Notion API Docs](https://developers.notion.com/)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

### 주요 의존성
- `@notionhq/client@5.21.0` - Notion API
- `next@15.5.2` - Next.js 프레임워크
- `react@19.1.0` - React
- `tailwindcss@4.1.13` - CSS 유틸리티
- `next-themes@0.4.6` - 테마 관리

---

## 변경 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|---------|
| 1.0 | 2026-05-13 | 초기 버전 (Phase 1 기준) |

---

**마지막 수정**: 2026-05-13  
**작성자**: Claude Code (AI Agent)  
**상태**: 활성화 (프로젝트 진행 중)
