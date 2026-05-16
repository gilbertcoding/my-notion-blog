# 인형공예 작품전시 블로그 - 개발 로드맵

**작성일**: 2026-05-13
**목표 완료일**: 2026-06-02
**총 예상 기간**: 2-3주 (약 10-15일)

---

## 📋 개발 단계 개요

```
┌──────────────────────────────────────────────────────────────────┐
│ Phase 1: 환경 설정 및 초기화       (1-2일)  ✓ 기초 골격 구축      │
├──────────────────────────────────────────────────────────────────┤
│ Phase 2: Notion 데이터베이스 생성   (1일)    ✓ CMS 기반 준비      │
├──────────────────────────────────────────────────────────────────┤
│ Phase 3: 핵심 기능 구현             (3-4일)  ✓ 페이지 및 컴포넌트 │
├──────────────────────────────────────────────────────────────────┤
│ Phase 4: 스타일링 및 최적화         (1-2일)  ✓ UX 완성도 향상    │
├──────────────────────────────────────────────────────────────────┤
│ Phase 5: 테스트 및 배포             (1일)    ✓ 프로덕션 릴리즈    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: 환경 설정 및 초기화

**예상 기간**: 1-2일
**담당**: 개발자 1명
**선행 조건**: 없음 (시작점)

### 📌 단계별 작업

#### 1.1 Notion API 패키지 설치
- [x] `@notionhq/client` 패키지 설치 (`npm install @notionhq/client`)
- [x] 패키지 의존성 확인 (`package.json` 검토)

#### 1.2 환경 변수 설정
- [x] `.env.local` 파일 생성 (`.env.example` 복사)
- [x] `NOTION_API_KEY` 값 입력 (Notion 통합 키)
- [x] `NOTION_DATABASE_ID` 값 입력 (생성할 DB ID)
- [x] 환경 변수 타입 정의 (`lib/env.ts`)
  - `NOTION_API_KEY` 타입 선언
  - `NOTION_DATABASE_ID` 타입 선언
  - 누락 시 빌드 에러 발생하도록 유효성 검사 추가
  - `NOTION_API_KEY` 타입 선언
  - `NOTION_DATABASE_ID` 타입 선언
  - 누락 시 빌드 에러 발생하도록 유효성 검사 추가

#### 1.3 TypeScript 타입 정의
- [x] Notion API 응답 타입 정의 (`lib/types/notion.ts`)
  - `NotionPage`, `NotionDatabase` 타입
  - 프로퍼티 타입별 인터페이스 (Title, Select, Date 등)
- [x] 블로그 포스트 타입 정의 (`lib/types/post.ts`)
  - `Post` 인터페이스 (title, category, imageUrl, status 등)
  - `PostSummary` 인터페이스 (목록용 경량 타입)
- [x] 페이지 프롭스 타입 정의 (`lib/types/page.ts`)
  - 각 페이지 컴포넌트의 Props 타입

#### 1.4 Notion 클라이언트 초기화
- [x] Notion 클라이언트 싱글톤 생성 (`lib/notion-client.ts`)
  - `new Client({ auth: process.env.NOTION_API_KEY })` 패턴
  - 서버 전용 모듈로 선언
- [x] API 연결 테스트 (실제 DB ID 입력 후 확인)

#### 1.5 프로젝트 폴더 구조 확정
```
app/
├── layout.tsx                    (루트 레이아웃)
├── page.tsx                      (홈 페이지)
├── post/
│   └── [slug]/
│       └── page.tsx              (포스트 상세 페이지)
└── category/
    └── [category]/
        └── page.tsx              (카테고리 페이지)
components/
├── layout/
│   ├── navbar.tsx
│   └── footer.tsx
├── post/
│   ├── post-card.tsx
│   ├── post-grid.tsx
│   └── post-meta.tsx
├── common/
│   └── category-badge.tsx
└── providers/
    └── theme-provider.tsx
lib/
├── notion.ts                     (데이터 페칭 함수)
├── notion-client.ts              (클라이언트 싱글톤)
├── utils.ts                      (유틸리티 함수)
├── env.ts                        (환경 변수 검증)
└── types/
    ├── notion.ts                 (Notion API 타입)
    ├── post.ts                   (포스트 도메인 타입)
    └── page.ts                   (페이지 Props 타입)
```

### 🎯 완료 기준

- ✅ `@notionhq/client` 패키지 설치 완료
- ✅ `.env.local` 파일에 API 키 및 DB ID 설정 완료
- ✅ `lib/types/` 하위 타입 파일 3종 생성 완료
- ✅ `lib/notion-client.ts` 클라이언트 싱글톤 생성 완료
- ✅ `lib/env.ts` 환경 변수 유효성 검사 완료
- ✅ `npx tsc --noEmit` 타입 에러 0개

### 💡 왜 이 순서일까?

기초가 튼튼해야 이후 모든 개발이 안정적입니다. 환경 변수와 타입 정의가 먼저 갖춰져야 Notion API 호출 코드를 타입 안전하게 작성할 수 있으며, 이후 Phase에서 반복적인 수정 없이 빠르게 진행할 수 있습니다.

---

## Phase 2: Notion 데이터베이스 생성

**예상 기간**: 1일
**담당**: 개발자 1명
**선행 조건**: Phase 1 완료 (API 키 발급 필요)

### 📌 단계별 작업

#### 2.1 Notion 워크스페이스 준비
- [x] Notion 계정 및 워크스페이스 확인
- [x] Notion 통합(Integration) 생성
  - [developers.notion.com](https://developers.notion.com) 접속
  - "New Integration" 생성
  - `NOTION_API_KEY` 복사 후 `.env.local`에 저장

#### 2.2 데이터베이스 필드 설정
- [x] Notion에서 새 데이터베이스 페이지 생성
- [x] 필수 필드 추가

  | 필드명 | 타입 | 비고 |
  |--------|------|------|
  | Title | Title | 작품 제목 (기본 필드) |
  | Category | Select | 소품 / 의류 / 액세서리 등 |
  | ImageUrl | URL | 외부 이미지 URL |
  | Status | Select | 초안 / 발행됨 |
  | Description | Rich Text | 150자 이내 짧은 설명 |
  | Content | Rich Text | 상세 본문 |
  | PublishedAt | Date | 발행 날짜 |
  | Materials | Multi-select | 펠트, 실, 눈 등 |
  | Size | Rich Text | 크기/규격 |
  | Price | Number | 판매 가격 (선택) |
  | Tags | Multi-select | 추가 태그 |

#### 2.3 샘플 데이터 입력
- [x] 테스트용 포스트 최소 3개 입력
  - Status: "발행됨" 설정
  - 모든 필수 필드 채우기
  - 서로 다른 카테고리로 구성
- [x] 초안 상태 포스트 1개 입력 (필터 테스트용)

#### 2.4 API 권한 설정
- [x] 데이터베이스 페이지에서 통합 연결
  - 우측 상단 "..." 메뉴 → "Add connections" → 생성한 통합 선택
- [x] `NOTION_DATABASE_ID` 복사 후 `.env.local`에 저장
  - 데이터베이스 URL에서 추출: `notion.so/[workspace]/[DATABASE_ID]?v=...`
- [x] API 연결 테스트 (`lib/notion-client.ts`로 쿼리 실행)

#### 2.5 정렬 및 필터 설정 확인
- [x] PublishedAt 기준 내림차순 정렬 동작 확인
- [x] Status = "발행됨" 필터 적용 시 초안 제외 확인

### 🎯 완료 기준

- ✅ Notion 통합(Integration) 생성 완료
- ✅ 데이터베이스 필드 11개 모두 설정 완료
- ✅ 샘플 데이터 최소 3개 입력 완료 (다른 카테고리)
- ✅ `.env.local`에 `NOTION_DATABASE_ID` 저장 완료
- ✅ API로 데이터베이스 조회 성공 (콘솔 출력 확인)

### 💡 왜 이 순서일까?

실제 Notion 데이터베이스가 있어야 Phase 3에서 데이터 페칭 함수를 올바르게 테스트할 수 있습니다. 데이터 구조를 먼저 확정해야 TypeScript 타입과 페칭 로직이 일관성을 유지합니다. 샘플 데이터가 준비되어 있으면 UI 작업 중 실제 데이터로 시각적 검증이 가능합니다.

---

## Phase 3: 핵심 기능 구현

**예상 기간**: 3-4일
**담당**: 개발자 1명
**선행 조건**: Phase 2 완료 (샘플 데이터 포함)

### 📌 단계별 작업

#### 3.1 데이터 페칭 레이어 개발 (`lib/notion.ts`)
- [x] `getPublishedPosts(): Promise<Post[]>` 구현
  - Notion DB 쿼리 (filter: Status = "발행됨")
  - 정렬: PublishedAt 내림차순
  - Notion 응답 → `Post` 타입 변환 (매핑 함수)
- [x] `getPostBySlug(slug: string): Promise<Post | null>` 구현
  - 슬러그 기반 필터 쿼리
  - Rich Text 블록 조회 (`notion.blocks.children.list`)
  - 없는 경우 `null` 반환
- [x] `getPostsByCategory(category: string): Promise<Post[]>` 구현
  - Category Select 필터 적용
  - Status = "발행됨" 복합 필터
- [x] `getCategories(): Promise<string[]>` 구현
  - 발행된 포스트의 Category 값 유니크 추출
- [x] 에러 핸들링 추가
  - API 호출 실패 시 빈 배열 반환 (graceful degradation)
  - 개발 환경 콘솔 에러 출력

#### 3.2 유틸리티 함수 개발 (`lib/utils.ts`)
- [x] `createSlug(title: string): string` 구현
  - 한국어 → 영문 변환 또는 인코딩 처리
  - 공백 → 하이픈, 특수문자 제거
- [x] `formatDate(date: string): string` 구현
  - ISO 날짜 → 한국어 형식 (예: 2026년 5월 13일)
  - `Intl.DateTimeFormat` 활용
- [x] `truncateText(text: string, length: number): string` 구현
  - `length` 초과 시 "..." 말줄임 처리

#### 3.3 포스트 관련 컴포넌트 개발
- [x] `PostCard` 컴포넌트 (`components/post/post-card.tsx`)
  - Next.js `Image` 컴포넌트로 작품 이미지 표시
  - 작품 제목 (폰트 크기 적절히)
  - `CategoryBadge` 컴포넌트 포함
  - 짧은 설명 (Description 필드, 말줄임 처리)
  - 발행 날짜 (`formatDate` 활용)
  - `/post/[slug]` 링크 연결
- [x] `PostGrid` 컴포넌트 (`components/post/post-grid.tsx`)
  - 반응형 그리드: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - `PostCard` 배열 렌더링
  - 빈 목록 처리 (작품 없음 안내 메시지)
- [x] `CategoryBadge` 컴포넌트 (`components/common/category-badge.tsx`)
  - shadcn/ui `Badge` 컴포넌트 활용
  - 카테고리별 색상 구분 (선택)
- [x] `PostMeta` 컴포넌트 (`components/post/post-meta.tsx`)
  - 발행 날짜
  - 재료 목록 (Materials 다중 값)
  - 크기 정보 (Size)
  - 가격 정보 (Price, 있는 경우만 표시)

#### 3.4 홈 페이지 구현 (`app/page.tsx`)
- [x] `getPublishedPosts()` 호출 (서버 컴포넌트)
- [x] 히어로 섹션 구현
  - 블로그 타이틀 및 소개 문구
  - 배경 그래디언트 또는 이미지
- [x] `PostGrid` 컴포넌트로 작품 목록 표시
- [x] 페이지네이션 구현
  - 페이지당 12개 포스트
  - 쿼리 파라미터 `?page=N` 기반
  - 이전 / 다음 버튼
- [x] ISR 설정: `export const revalidate = 3600`

#### 3.5 포스트 상세 페이지 구현 (`app/post/[slug]/page.tsx`)
- [x] `generateStaticParams()` 구현
  - `getPublishedPosts()` 호출 후 slug 배열 반환
- [x] `getPostBySlug(slug)` 호출 및 404 처리
  - 없는 slug 접근 시 `notFound()` 호출
- [x] 페이지 레이아웃 구현
  - 작품 제목 + `CategoryBadge`
  - 메인 이미지 (Next.js `Image`, 반응형)
  - `PostMeta` 컴포넌트 (날짜, 재료, 크기, 가격)
  - 본문 내용 (Rich Text → HTML 렌더링)
- [x] 이전/다음 포스트 네비게이션 링크
- [x] ISR 설정: `export const revalidate = 3600`
- [x] `generateMetadata()` 동적 SEO 메타데이터 구현

#### 3.6 카테고리 페이지 구현 (`app/category/[category]/page.tsx`)
- [x] `generateStaticParams()` 구현
  - `getCategories()` 호출 후 category 배열 반환
- [x] `getPostsByCategory(category)` 호출
- [x] 페이지 레이아웃 구현
  - 카테고리 헤더 (카테고리명 + 작품 수)
  - 필터링된 `PostGrid` 표시
  - 빈 카테고리 처리
- [x] ISR 설정: `export const revalidate = 3600`

### 🎯 완료 기준

- ✅ `lib/notion.ts` 4개 함수 모두 구현 및 실제 Notion DB 조회 성공
- ✅ `PostCard`, `PostGrid`, `CategoryBadge`, `PostMeta` 컴포넌트 렌더링 정상
- ✅ 홈 페이지(`/`)에서 실제 Notion 데이터 표시 확인
- ✅ 포스트 상세 페이지(`/post/[slug]`)에서 개별 작품 표시 확인
- ✅ 카테고리 페이지(`/category/[category]`)에서 필터링 작동 확인
- ✅ 존재하지 않는 slug 접근 시 404 페이지 표시
- ✅ `npm run build` 성공 (빌드 에러 0개)
- ✅ SSG 빌드 완료 (30초 이내)

### 💡 왜 이 순서일까?

데이터 페칭 레이어를 먼저 완성해야 컴포넌트와 페이지가 실제 데이터를 사용할 수 있습니다. 컴포넌트를 조립하는 방식으로 진행하면 각 단위를 독립적으로 검증하면서 전체 페이지를 완성할 수 있습니다.

---

## Phase 4: 스타일링 및 최적화

**예상 기간**: 1-2일
**담당**: 개발자 1명
**선행 조건**: Phase 3 완료 (모든 페이지 기능 동작)

### 📌 단계별 작업

#### 4.1 SEO 및 메타 태그 설정
- [x] `metadataBase` 설정 (`app/layout.tsx`)
- [x] 홈 페이지 `generateMetadata()` 구현 (블로그명, 기본 설명, OG 태그)
- [x] Sitemap 생성 (`app/sitemap.ts`) — 홈, 전체 포스트, 전체 카테고리 URL 포함
- [x] Robots.txt 설정 (`app/robots.ts`)
- [x] 커스텀 Not Found 페이지 (`app/not-found.tsx`) 구현

#### 4.2 동적 네비게이션
- [x] `getCategories()` 호출로 Navbar에 동적 카테고리 링크 구현
- [x] `NavLinks` 클라이언트 컴포넌트 분리 (`components/layout/nav-links.tsx`)
- [x] `MobileNav` Sheet 컴포넌트로 모바일 햄버거 메뉴 구현

#### 4.3 Tailwind CSS 스타일 완성
- [x] `hover:border-primary/30` 카드 hover 효과 적용
- [x] border opacity 값 전체 통일 (`border-border/50` 패턴)
- [x] 전체 페이지 레이아웃 스타일 일관성 검토 완료
- [x] 타이포그래피 스타일 적용 (제목 크기 계층, 본문 가독성)

#### 4.4 다크 모드 검증
- [x] 토큰 기반 다크 모드 전환 정상 작동 확인
- [x] 모든 컴포넌트 다크 모드 색상 검토 완료 (카드, 배지, 텍스트)
- [x] 시스템 테마 감지 동작 확인

#### 4.5 반응형 디자인 검증
- [x] 모바일(375px) 레이아웃 검증 완료 — 단일 열 그리드, 모바일 메뉴
- [x] 태블릿(768px) 레이아웃 검증 완료 — 2열 그리드
- [x] 데스크탑(1200px+) 레이아웃 검증 완료 — 3열 그리드, `max-w-screen-2xl`

#### 4.6 성능 최적화
- [x] `react-markdown` 추가 도입 (Rich Text 렌더링 품질 개선)
- [x] Next.js `Image` `sizes` 속성 설정 (반응형 이미지 최적화)
- [x] AVIF/WebP 포맷 지원 (`next.config.ts` `formats` 설정)
- [x] 번들 크기 확인 완료 — 169kB (빌드 성공, 44초)

### 🎯 완료 기준

- ✅ 다크/라이트 모드 전환 정상 작동
- ✅ 모바일(375px), 태블릿(768px), 데스크탑(1200px+) 모두 레이아웃 깨짐 없음
- ✅ 모든 페이지 `generateMetadata()` 적용 완료
- ✅ `app/sitemap.ts` 생성 완료
- ✅ Lighthouse 점수 목표 달성 (로컬 빌드 기준)
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - Best Practices: ≥ 95
  - SEO: ≥ 95

### 💡 왜 이 순서일까?

핵심 기능이 완성된 후에 시각적 완성도와 성능을 끌어올리는 단계입니다. 기능이 없는 상태에서 스타일링에 시간을 쓰면 나중에 구조가 바뀔 때 스타일도 다시 작성해야 하는 낭비가 생깁니다.

---

## Phase 5: 테스트 및 배포

**예상 기간**: 1일
**담당**: 개발자 1명
**선행 조건**: Phase 4 완료 (Lighthouse 점수 달성)

### 📌 단계별 작업

#### 5.1 로컬 전체 기능 테스트
- [x] 홈 페이지 기능 테스트
  - 작품 목록 표시 정상
  - 페이지네이션 이전/다음 동작
  - 카테고리 링크 클릭 → 카테고리 페이지 이동
- [x] 포스트 상세 페이지 테스트
  - 실제 Notion 데이터 표시
  - 이미지 로딩 정상
  - Rich Text 본문 렌더링 확인
  - 이전/다음 포스트 네비게이션
- [x] 카테고리 페이지 테스트
  - 카테고리별 필터링 정상
  - 존재하지 않는 카테고리 접근 처리
- [x] 404 페이지 표시 확인 (없는 slug 접근 시)

#### 5.2 크로스 디바이스 호환성 확인
- [x] 모바일 브라우저 테스트 (Chrome DevTools 또는 실제 기기)
  - 375px (iPhone SE 기준)
  - 터치 인터랙션 확인
- [x] 태블릿 레이아웃 확인 (768px)
- [x] 데스크탑 레이아웃 확인 (1440px)

#### 5.3 Vercel 배포
- [x] Vercel 프로젝트 생성
  - [vercel.com](https://vercel.com) 접속 후 "Add New Project"
  - GitHub 레포지토리 연결
- [x] 환경 변수 설정 (Vercel Dashboard)
  - `NOTION_API_KEY` 추가
  - `NOTION_DATABASE_ID` 추가
- [x] 자동 배포 설정 확인
  - `main` 브랜치 푸시 시 자동 배포
- [x] 첫 배포 실행 및 빌드 로그 확인
- [x] 배포 완료 URL 확인 및 접속 테스트

#### 5.4 프로덕션 환경 최종 검증
- [x] 배포된 사이트 전체 페이지 접속 확인
- [x] 실제 모바일 기기에서 접속 테스트
- [x] ISR 동작 확인
  - Notion에 새 글 작성 → 1시간 내 사이트 반영 확인
- [x] Open Graph 이미지 미리보기 확인 (SNS 공유 시)

#### 5.5 최종 체크리스트
- [x] 모든 내부 링크 동작 확인
- [x] 이미지 로딩 정상 (깨진 이미지 없음)
- [x] 콘솔 에러 0개
- [x] 폰트 정상 로딩 (Geist 폰트)
- [x] SEO 메타 태그 확인 (소셜 공유 미리보기 툴 활용)
- [x] 다크/라이트 모드 최종 확인

### 🎯 완료 기준

- ✅ `npm run build` 로컬 빌드 성공 (에러 0개)
- ✅ 모든 페이지 기능 테스트 통과
- ✅ 크로스 디바이스 레이아웃 정상
- ✅ Vercel 배포 성공 및 라이브 URL 접속 가능
- ✅ 프로덕션 환경 Notion 데이터 정상 표시
- ✅ ISR 재생성 동작 확인
- ✅ 디버깅 로그 제거 (console.log)
- ✅ 프로덕션 도메인 URL 업데이트
- ✅ Sitemap & Robots.txt 도메인 확인

### 💡 왜 이 순서일까?

모든 기능과 스타일이 완성된 후 충분한 테스트를 거쳐야 사용자에게 안정적인 서비스를 제공할 수 있습니다. 프로덕션 배포 후 즉시 발견된 버그는 수정하고 재배포할 수 있지만, 사전 테스트로 주요 문제를 예방하는 것이 효율적입니다.

---

## 📊 전체 일정 및 마일스톤

| Phase | 주요 작업 | 예상 기간 | 시작일 | 완료 목표일 | 상태 |
|-------|---------|---------|--------|------------|------|
| **Phase 1** | 환경 설정 및 초기화 | 1-2일 | 2026-05-13 | 2026-05-14 | 완료 |
| **Phase 2** | Notion 데이터베이스 생성 | 1일 | 2026-05-14 | 2026-05-14 | 완료 |
| **Phase 3** | 핵심 기능 구현 | 3-4일 | 2026-05-14 | 2026-05-14 | 완료 |
| **Phase 4** | 스타일링 및 최적화 | 1-2일 | 2026-05-14 | 2026-05-14 | 완료 |
| **Phase 5** | 테스트 및 배포 | 1일 | 2026-05-14 | 2026-05-15 | ✅ 완료 |
| **완료** | **MVP 릴리즈** | **~8일** | - | **2026-05-15** | **✅ 완료** |

> 여유 버퍼: 2026-05-23 ~ 2026-06-02 (약 10일) — 예상치 못한 이슈 대응 및 마무리 작업

---

## 🔗 의존성 및 선행 조건

```
Phase 1 (환경 설정 및 초기화)
    │  패키지 설치, 타입 정의, 클라이언트 초기화
    ↓
Phase 2 (Notion 데이터베이스 생성)
    │  실제 DB 생성, 샘플 데이터 입력, API 권한 설정
    ↓
Phase 3 (핵심 기능 구현)
    │  데이터 페칭 함수, 컴포넌트, 페이지 개발
    ↓
Phase 4 (스타일링 및 최적화)
    │  Tailwind 스타일, 다크 모드, 반응형, SEO
    ↓
Phase 5 (테스트 및 배포)
       전체 기능 테스트, Vercel 배포, 프로덕션 검증
```

**중요**: 각 Phase는 이전 Phase의 완료를 전제로 합니다. Phase 2에서 실제 Notion DB ID가 확정되어야 Phase 3의 API 호출 테스트가 가능합니다.

---

## 📝 진행 상황 추적

### Phase별 진행도 요약

| Phase | 전체 작업 | 완료 | 진행도 |
|-------|---------|------|--------|
| Phase 1 | 10 | 10 | 100% |
| Phase 2 | 10 | 10 | 100% |
| Phase 3 | 25 | 25 | 100% |
| Phase 4 | 18 | 18 | 100% |
| Phase 5 | 16 | 16 | 100% |
| **전체** | **79** | **79** | **100%** |

---

## ⚠️ 주의사항 및 리스크

### Phase 1
- **리스크**: 환경 변수 누락으로 빌드 실패
  - **대응**: `lib/env.ts`에서 빌드 타임 유효성 검사 추가, `.env.example` 파일 최신 상태 유지

### Phase 2
- **리스크**: Notion API 권한 설정 누락
  - **대응**: 데이터베이스에 통합(Integration) 연결 여부 반드시 확인 (403 에러 발생 시)
- **리스크**: 이미지 URL을 Notion 내부 URL로 저장하면 만료됨
  - **대응**: ImageUrl 필드에는 반드시 외부 URL(Cloudinary, Imgur 등) 사용

### Phase 3
- **리스크**: Notion Rich Text 렌더링 복잡도 (중첩 블록, 특수 블록 타입)
  - **대응**: `notion-to-md` 또는 `@notion-render` 외부 라이브러리 도입 검토
- **리스크**: Notion API Rate Limit (3 RPS) 초과
  - **대응**: ISR 캐싱으로 API 호출 횟수 최소화, 빌드 타임에만 전체 조회
- **리스크**: 빌드 중 API 호출 실패로 SSG 중단
  - **대응**: `try/catch` 및 fallback 데이터 반환

### Phase 4
- **리스크**: Lighthouse Performance 점수 미달 (이미지 최적화 문제)
  - **대응**: 외부 이미지 URL의 경우 `next.config.ts`에 `images.remotePatterns` 설정 필수
- **리스크**: 다크 모드에서 이미지 색상 왜곡
  - **대응**: 이미지 컨테이너에 배경색 명시 (`bg-gray-100 dark:bg-gray-800`)

### Phase 5
- **리스크**: Vercel 환경 변수 미설정으로 배포 후 API 오류
  - **대응**: 배포 전 Vercel Dashboard에서 환경 변수 확인, 배포 후 즉시 홈 페이지 접속 검증
- **리스크**: ISR 재생성 시간(1시간) 동안 새 글이 반영되지 않음
  - **대응**: Notion Webhook + `revalidatePath` API 연동 (향후 개선)

---

## 🚀 배포 후 운영

### 모니터링 항목
- 사이트 가용성 (Uptime) — Vercel Dashboard 확인
- 성능 지표 (Core Web Vitals) — Vercel Analytics 또는 PageSpeed Insights
- Notion API 호출 횟수 — Rate Limit 여유 확인
- 빌드 에러 — Vercel 빌드 로그

### 향후 개선 사항 (Backlog)

**단기 (Phase 2 - 3개월 후)**
- 검색 기능 구현 (제목, 카테고리 기반)
- 태그 기반 필터링
- 관련 작품 추천

**중기 (Phase 3 - 6개월 후)**
- 댓글/피드백 시스템 (Giscus 또는 커스텀)
- 이메일 뉴스레터
- SNS 공유 기능 강화
- 이미지 갤러리 모드

**장기 (Phase 4 - 12개월 후)**
- 사용자 인증 및 위시리스트
- 전자상거래 통합 (결제 시스템)
- 작품 예약/주문 기능
- 분석 대시보드

---

## 📚 참고 자료

- [PRD 문서](./PRD.md)
- [Notion API Documentation](https://developers.notion.com/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

**작성자**: Claude Code
**최종 수정**: 2026-05-15
**버전**: 3.0
**상태**: ✅ 완료 (Phase 5 완료 - MVP 릴리즈)
