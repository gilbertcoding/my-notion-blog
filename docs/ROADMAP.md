# 인형공예 작품전시 블로그 - 고도화 로드맵 (Post-MVP)

**작성일**: 2026-05-16
**MVP 완료일**: 2026-05-15 ✅
**고도화 시작일**: 2026-08-01 (예정)
**총 예상 기간**: 약 9개월 (Phase 2 → Phase 4 단계적 진행)

---

## 📋 고도화 단계 개요

```
┌──────────────────────────────────────────────────────────────────────┐
│ ✅ MVP (v1.0)                       2026-05-15  Notion CMS 블로그 완성 │
├──────────────────────────────────────────────────────────────────────┤
│ Phase 2: 검색 및 필터링 고도화         (3-4주)   2026-08-01 ~ 2026-08-31│
│           전체 텍스트 검색, 태그 필터, 고급 검색, 관련 작품 추천         │
├──────────────────────────────────────────────────────────────────────┤
│ Phase 3: 커뮤니티 및 참여              (4-6주)   2026-11-01 ~ 2026-12-15│
│           댓글/리뷰, 뉴스레터, SNS 공유 강화, 갤러리 모드               │
├──────────────────────────────────────────────────────────────────────┤
│ Phase 4: 전자상거래                    (8-10주)  2027-05-01 ~ 2027-07-15│
│           회원 인증, 위시리스트, 장바구니/결제, 작품 예약/주문          │
└──────────────────────────────────────────────────────────────────────┘
```

> **고도화 전략**: MVP 운영 데이터(방문자 행동, 인기 카테고리, API 부하)를 기반으로 각 Phase 시작 전 우선순위를 재검증합니다.

---

## 🎯 고도화 목표 및 방향성

### 비즈니스 목표
1. **콘텐츠 발견성 향상** (Phase 2): 작품 수가 50개 이상으로 늘어날 때 검색·필터링으로 사용자 이탈 방지
2. **사용자 참여 증대** (Phase 3): 일회성 방문에서 정기 방문으로 전환, 재방문율 30% 이상 달성
3. **수익화 기반 마련** (Phase 4): 작품 판매 채널을 블로그 내에서 완결, 외부 결제 페이지 이탈 제거

### 기술 방향성
- **MVP 아키텍처 유지**: Next.js 15 App Router + Notion CMS 핵심 구조 보존
- **점진적 확장**: 기존 구조를 깨지 않고 기능 모듈 추가 (구조 우선 접근법 유지)
- **외부 서비스 활용**: 자체 백엔드 구축 최소화, SaaS 통합 우선 검토

---

## Phase 2: 검색 및 필터링 고도화

**예상 기간**: 3-4주 (약 15-20일)
**시작 시점**: MVP 출시 후 약 3개월 (2026-08-01 예정)
**담당**: 개발자 1명
**선행 조건**: MVP 운영 데이터 수집 완료 (방문자 분석, 인기 카테고리/태그 파악)

### 📌 단계별 작업

#### 2.1 검색 인프라 선정 및 도입

- [ ] 검색 솔루션 비교 분석
  - 옵션 A: **Algolia** (유료, 즉시 사용 가능, 한국어 형태소 분석 우수)
  - 옵션 B: **MeiliSearch** (오픈소스, 자가 호스팅, 비용 절감)
  - 옵션 C: **클라이언트 사이드 검색** (Fuse.js, 작품 100개 이하 시)
- [ ] 비용/성능/한국어 지원 기준으로 솔루션 결정
- [ ] 검색 인덱스 설계
  - 인덱싱 필드: Title, Description, Content, Category, Materials, Tags
  - 가중치 부여: Title (높음) > Tags > Category > Description > Content
- [ ] 환경 변수 추가 (`.env.local`)
  - `ALGOLIA_APP_ID`, `ALGOLIA_ADMIN_KEY`, `ALGOLIA_SEARCH_KEY` 또는
  - `MEILI_HOST`, `MEILI_API_KEY`

#### 2.2 검색 인덱스 동기화 파이프라인

- [ ] Notion → 검색 엔진 동기화 함수 구현 (`lib/search/sync.ts`)
  - `getPublishedPosts()` 호출 → 검색 인덱스 업데이트
  - 변경 감지 및 incremental update
- [ ] Vercel Cron Job 설정 (1시간마다 동기화)
  - `app/api/cron/sync-search/route.ts` 엔드포인트 생성
  - `CRON_SECRET` 환경 변수로 인증
- [ ] 수동 재인덱싱 스크립트 (`scripts/reindex-search.ts`)
- [ ] 동기화 실패 시 알림 (Slack Webhook 또는 이메일)

#### 2.3 검색 UI 컴포넌트 구현

- [ ] 헤더 검색바 컴포넌트 (`components/search/search-bar.tsx`)
  - shadcn/ui `Command` 컴포넌트 활용 (`cmdk` 기반)
  - 키보드 단축키: `Cmd+K` / `Ctrl+K`
  - 디바운싱 (300ms) 적용
- [ ] 검색 결과 드롭다운 (`components/search/search-results.tsx`)
  - 실시간 자동완성 (typeahead)
  - 검색어 하이라이트
  - 키보드 네비게이션 (↑↓ Enter)
- [ ] 검색 결과 페이지 (`app/search/page.tsx`)
  - 쿼리 파라미터 `?q=` 기반
  - 결과 그리드 (`PostGrid` 재활용)
  - 검색 결과 없음 처리
- [ ] 검색 히스토리 (localStorage, 최근 5개)

#### 2.4 태그 기반 필터링

- [ ] 태그 인덱스 구축 (`lib/notion.ts`)
  - `getAllTags(): Promise<Tag[]>` 구현 (태그별 작품 수 포함)
  - Notion `Tags` Multi-select 필드 활용
- [ ] 태그 페이지 (`app/tag/[tag]/page.tsx`)
  - `generateStaticParams()` — 모든 태그 SSG
  - 태그명 + 작품 수 헤더
  - 필터링된 `PostGrid`
  - ISR `revalidate = 3600`
- [ ] 태그 클라우드 컴포넌트 (`components/tag/tag-cloud.tsx`)
  - 작품 수에 비례한 폰트 크기
  - 사이드바 또는 푸터 영역에 배치
- [ ] 상세 페이지에 태그 링크 추가

#### 2.5 고급 검색 (Advanced Search)

- [ ] 고급 검색 페이지 (`app/search/advanced/page.tsx`)
- [ ] 필터 UI 구현
  - 카테고리 (Select, 다중 선택)
  - 재료 (Multi-select, AND/OR 조건)
  - 가격 범위 (Slider, 최소-최대)
  - 발행 기간 (DatePicker, 시작-종료)
  - 태그 (Multi-select)
- [ ] React Hook Form + Zod로 필터 상태 관리
- [ ] URL 쿼리 동기화 (북마크/공유 가능)
- [ ] 필터 초기화 버튼
- [ ] 적용된 필터 칩(Chip) 표시

#### 2.6 관련 작품 추천

- [ ] 추천 알고리즘 설계 (`lib/recommendations.ts`)
  - 기본: 같은 카테고리 + 공통 태그 점수 합산
  - 점수 가중치: Category 일치(3) + Tag 일치(개당 1) + Materials 일치(개당 0.5)
  - 자기 자신 제외, 상위 4개 추출
- [ ] 추천 컴포넌트 (`components/post/related-posts.tsx`)
  - 상세 페이지 하단에 4개 카드 표시
  - 반응형 그리드 (2x2 모바일 → 4x1 데스크탑)
- [ ] 캐싱 전략: ISR로 정적 생성, 빌드 타임 추천 계산
- [ ] A/B 테스트 준비 (추후 다른 알고리즘 비교용)

#### 2.7 검색 분석 및 최적화

- [ ] 검색어 로그 수집 (검색 엔진 내장 또는 Vercel Analytics)
- [ ] 인기 검색어 표시 (검색 빈 상태 UI)
- [ ] 검색 결과 0건 검색어 추적 → 콘텐츠 보완 인사이트
- [ ] 검색 성능 측정 (응답 시간 < 200ms 목표)

### 🎯 완료 기준

- ✅ 검색 솔루션 선정 및 인덱스 동기화 자동화 완료
- ✅ 헤더에서 `Cmd+K`로 즉시 검색 가능
- ✅ 검색 결과 페이지에서 모든 작품 검색 가능 (Title, Description, Content)
- ✅ 태그 페이지 동적 생성 및 ISR 정상 동작
- ✅ 고급 검색에서 카테고리/재료/가격/날짜/태그 다중 필터 조합 가능
- ✅ 상세 페이지에 관련 작품 4개 표시
- ✅ 검색 응답 시간 < 200ms (검색 엔진 사용 시)
- ✅ Lighthouse 점수 유지 (Performance ≥ 90)
- ✅ `npx tsc --noEmit` 타입 에러 0개

### 💡 왜 이 순서일까?

검색 인프라(인덱스 동기화)가 먼저 구축되어야 UI에서 실제 검색이 가능합니다. 태그 필터링은 기존 Notion 데이터를 그대로 활용할 수 있어 검색보다 우선 구현 가능하지만, 검색 인덱스에 태그를 함께 등록하면 통합 검색 경험을 제공할 수 있습니다. 관련 작품 추천은 모든 메타데이터(카테고리, 태그)가 인덱싱된 후에 효과적으로 동작합니다.

### 🔧 신규 의존성

```json
{
  "dependencies": {
    "algoliasearch": "^5.x" (또는 "meilisearch": "^0.x"),
    "@algolia/autocomplete-js": "^1.x",
    "react-instantsearch": "^7.x",
    "cmdk": "^1.x",
    "@radix-ui/react-slider": "^1.x"
  }
}
```

---

## Phase 3: 커뮤니티 및 참여

**예상 기간**: 4-6주 (약 20-30일)
**시작 시점**: MVP 출시 후 약 6개월 (2026-11-01 예정)
**담당**: 개발자 1명 (+ 디자인 협업 1주)
**선행 조건**: Phase 2 완료 (검색 인프라 안정화), 월간 방문자 1,000명 이상

### 📌 단계별 작업

#### 3.1 댓글/리뷰 시스템 도입

- [ ] 댓글 솔루션 비교
  - 옵션 A: **Giscus** (GitHub Discussions 기반, 무료, 깃허브 계정 필요)
  - 옵션 B: **Disqus** (무료/유료, 광고 노출 이슈)
  - 옵션 C: **자체 댓글 시스템** (Supabase + 익명 댓글)
- [ ] 솔루션 선정 (운영자 친화 + 사용자 진입장벽 균형)
- [ ] 댓글 컴포넌트 통합 (`components/comments/comments.tsx`)
  - 상세 페이지 본문 하단에 배치
  - 다크 모드 테마 자동 동기화
- [ ] 댓글 모더레이션 정책 수립 (스팸 필터링, 욕설 차단)
- [ ] 댓글 알림 (운영자 이메일, 새 댓글 발생 시)

#### 3.2 리뷰 시스템 (별점 + 후기)

- [ ] 리뷰 데이터 스키마 설계
  - **Supabase** PostgreSQL 테이블: `reviews`
  - 필드: `id`, `post_slug`, `rating` (1-5), `author_name`, `content`, `created_at`, `is_approved`
- [ ] Supabase 클라이언트 설정 (`lib/supabase/client.ts`)
- [ ] 리뷰 작성 폼 (`components/reviews/review-form.tsx`)
  - React Hook Form + Zod 검증
  - 별점 입력 (인터랙티브)
  - 작성자명 + 후기 본문
- [ ] 리뷰 목록 컴포넌트 (`components/reviews/review-list.tsx`)
  - 페이지네이션 (10개씩)
  - 평균 별점 표시
  - 정렬 (최신순/별점순)
- [ ] Server Action으로 리뷰 등록 (`app/post/[slug]/actions.ts`)
- [ ] 스팸 방지 (Cloudflare Turnstile 또는 reCAPTCHA v3)
- [ ] 관리자 승인 워크플로우 (Supabase Dashboard)

#### 3.3 이메일 뉴스레터

- [ ] 뉴스레터 서비스 선정
  - 옵션 A: **Resend** (개발자 친화, 월 3,000건 무료)
  - 옵션 B: **Buttondown** (간단, 월 100명까지 무료)
  - 옵션 C: **MailerLite** (월 1,000명까지 무료)
- [ ] 구독 폼 컴포넌트 (`components/newsletter/subscribe-form.tsx`)
  - 푸터 + 홈 페이지 히어로 하단
  - 이메일 입력 + 동의 체크박스
  - 성공/실패 토스트 메시지
- [ ] Server Action으로 구독 처리 (`app/actions/subscribe.ts`)
  - 더블 옵트인 (확인 이메일 발송)
  - 구독 해지 링크 자동 포함
- [ ] 뉴스레터 발송 워크플로우
  - 신규 작품 발행 시 자동 발송 (Notion Webhook 연동)
  - 월간 다이제스트 템플릿 (인기 작품 3-5개)
- [ ] 이메일 템플릿 (`emails/new-post.tsx`, React Email 활용)
- [ ] 개인정보 처리방침 페이지 (`app/privacy/page.tsx`)

#### 3.4 SNS 공유 기능 강화

- [ ] 공유 버튼 컴포넌트 (`components/share/share-buttons.tsx`)
  - 카카오톡 (카카오 JavaScript SDK)
  - 페이스북, 트위터/X, 핀터레스트 (특히 작품 이미지 적합)
  - URL 복사 (clipboard API)
  - 네이버 블로그 공유
- [ ] 동적 OG 이미지 생성 (`app/api/og/route.tsx`)
  - `@vercel/og` 활용
  - 작품 이미지 + 제목 + 카테고리 자동 합성
  - 1200x630 표준 크기
- [ ] 트위터 카드 메타 태그 추가 (`twitter:card`, `twitter:image`)
- [ ] 핀터레스트 Rich Pin 메타 태그
- [ ] 공유 횟수 추적 (Plausible Analytics 또는 Umami)

#### 3.5 이미지 갤러리 모드

- [ ] 갤러리 라이브러리 선정
  - 옵션 A: `yet-another-react-lightbox` (기능 풍부)
  - 옵션 B: `react-photo-view` (모바일 친화)
- [ ] 상세 페이지 이미지 클릭 → 라이트박스 오픈
- [ ] 갤러리 뷰 페이지 (`app/gallery/page.tsx`)
  - Masonry 레이아웃 (`react-masonry-css`)
  - 무한 스크롤 (`react-intersection-observer`)
  - 카테고리/태그 필터 (Phase 2 재활용)
- [ ] 이미지 줌/팬 인터랙션
- [ ] 키보드 네비게이션 (← → ESC)
- [ ] 모바일 스와이프 제스처
- [ ] 다중 이미지 지원 (Notion Files & media 필드 활용 검토)

#### 3.6 사용자 참여 통계 대시보드 (운영자용)

- [ ] 운영자 전용 페이지 (`app/admin/stats/page.tsx`)
  - Basic Auth 또는 환경 변수 기반 비밀번호 보호
- [ ] 주요 지표 표시
  - 댓글 수, 리뷰 평균 별점
  - 뉴스레터 구독자 수
  - 인기 작품 Top 10 (조회수 기반)
  - 인기 검색어 (Phase 2 연동)
- [ ] 차트 라이브러리: Recharts 또는 Tremor

### 🎯 완료 기준

- ✅ 모든 상세 페이지에 댓글 시스템 표시
- ✅ 리뷰 작성/조회/평균 별점 표시 정상 동작
- ✅ 뉴스레터 구독 → 더블 옵트인 → 신규 글 자동 발송 파이프라인 동작
- ✅ 5종 이상 SNS 공유 버튼 동작 (특히 카카오톡)
- ✅ 동적 OG 이미지 생성 (작품별 다른 이미지)
- ✅ 이미지 갤러리 라이트박스 데스크탑/모바일 정상 동작
- ✅ 운영자 통계 대시보드 접근 가능
- ✅ 개인정보 처리방침 페이지 게시
- ✅ Lighthouse Performance ≥ 85 (외부 스크립트 증가로 인한 허용 범위)

### 💡 왜 이 순서일까?

댓글/리뷰는 사용자 참여의 첫 진입점이므로 가장 먼저 도입합니다. 뉴스레터는 재방문을 유도하는 핵심 채널이며, 구독자가 쌓이려면 시간이 필요하므로 일찍 시작해야 합니다. SNS 공유와 갤러리 모드는 이미 콘텐츠가 풍부해진 후에 효과가 극대화됩니다. 통계 대시보드는 다른 기능들이 데이터를 만들어낸 후에 의미가 있습니다.

### 🔧 신규 의존성

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "resend": "^4.x",
    "react-email": "^3.x",
    "@vercel/og": "^0.x",
    "yet-another-react-lightbox": "^3.x",
    "react-masonry-css": "^1.x",
    "recharts": "^2.x"
  }
}
```

### ⚙️ 아키텍처 변경 사항

- **데이터 저장소 추가**: Notion(콘텐츠) + Supabase(사용자 생성 데이터: 리뷰, 구독자)
- **Server Actions** 본격 활용 (폼 처리)
- **Edge Functions** 도입 (OG 이미지 동적 생성)
- **외부 서비스 의존성 증가**: Resend, Supabase, Algolia (Phase 2) → 가용성 모니터링 필요

---

## Phase 4: 전자상거래

**예상 기간**: 8-10주 (약 40-50일)
**시작 시점**: MVP 출시 후 약 12개월 (2027-05-01 예정)
**담당**: 개발자 1명 (+ 보안 검토 컨설팅 1주)
**선행 조건**: Phase 3 완료, 월간 방문자 5,000명 이상, 작품 판매 의향 조사 완료

### 📌 단계별 작업

#### 4.1 사용자 인증 시스템 (회원가입/로그인)

- [ ] 인증 솔루션 선정
  - 옵션 A: **Supabase Auth** (Phase 3에서 도입한 Supabase 확장)
  - 옵션 B: **NextAuth.js (Auth.js v5)** (유연한 프로바이더 지원)
  - 옵션 C: **Clerk** (UI 제공, 유료)
- [ ] 소셜 로그인 통합
  - 카카오 로그인 (한국 사용자 핵심)
  - 네이버 로그인
  - Google 로그인
- [ ] 이메일/비밀번호 로그인
  - 이메일 인증 (Resend 활용)
  - 비밀번호 재설정 플로우
- [ ] 인증 페이지 (`app/(auth)/login`, `app/(auth)/signup`, `app/(auth)/reset-password`)
- [ ] 미들웨어로 보호된 라우트 처리 (`middleware.ts`)
- [ ] 사용자 프로필 페이지 (`app/profile/page.tsx`)
  - 닉네임, 프로필 이미지, 배송지 주소 관리
- [ ] 세션 관리 및 자동 로그아웃 (보안 정책)

#### 4.2 위시리스트 기능

- [ ] 데이터 스키마 (Supabase `wishlists` 테이블)
  - `id`, `user_id`, `post_slug`, `created_at`
  - 복합 유니크 제약 (user_id + post_slug)
- [ ] 위시리스트 토글 컴포넌트 (`components/wishlist/wishlist-button.tsx`)
  - 작품 카드 + 상세 페이지에 하트 아이콘
  - 비로그인 시 로그인 모달 유도
  - 옵티미스틱 UI 업데이트
- [ ] 위시리스트 페이지 (`app/wishlist/page.tsx`)
  - 사용자가 저장한 작품 목록 (PostGrid 재활용)
  - 일괄 제거 / 장바구니 일괄 이동
- [ ] Server Actions로 추가/제거 처리
- [ ] 비로그인 사용자: localStorage 임시 저장 → 로그인 시 동기화

#### 4.3 장바구니 시스템

- [ ] 데이터 스키마 (Supabase `carts`, `cart_items` 테이블)
  - `carts`: `id`, `user_id`, `created_at`, `updated_at`
  - `cart_items`: `id`, `cart_id`, `post_slug`, `quantity`, `unit_price`, `created_at`
- [ ] 상태 관리: **Zustand** (`lib/stores/cart-store.ts`)
  - 비로그인 시 localStorage persist
  - 로그인 시 서버 동기화
- [ ] 장바구니 추가 버튼 (`components/cart/add-to-cart-button.tsx`)
  - 상세 페이지 + 카드 hover 시
  - 수량 선택 (Notion `Stock` 필드 신규 추가 필요)
  - 토스트 알림 + 미니 카트 미리보기
- [ ] 미니 카트 드롭다운 (`components/cart/mini-cart.tsx`)
  - 헤더 카트 아이콘 hover/click
  - 최근 추가 상품 3개 미리보기
- [ ] 장바구니 페이지 (`app/cart/page.tsx`)
  - 상품 목록 + 수량 조정 + 삭제
  - 소계, 배송비, 총액 계산
  - 결제 진행 버튼

#### 4.4 결제 시스템 통합

- [ ] PG사 선정 (한국 사용자 대상)
  - 옵션 A: **Toss Payments** (개발자 경험 우수, 카드/계좌이체/간편결제)
  - 옵션 B: **PortOne (구 아임포트)** (다중 PG 통합)
  - 옵션 C: **Stripe** (해외 결제 추가 고려 시)
- [ ] 사업자 등록 및 PG사 가맹점 계약 (운영자 업무)
- [ ] 결제 페이지 (`app/checkout/page.tsx`)
  - 배송지 입력/선택
  - 주문자 정보
  - 결제 수단 선택
  - 약관 동의 (필수: 구매 약관, 개인정보 제3자 제공)
- [ ] Toss Payments SDK 통합 (`@tosspayments/payment-sdk`)
- [ ] 결제 콜백 처리 (`app/api/payments/confirm/route.ts`)
  - 서버 사이드 결제 승인 (보안 필수)
  - 위변조 검증 (`paymentKey`, `orderId`, `amount`)
- [ ] 주문 데이터 스키마 (Supabase `orders`, `order_items` 테이블)
  - `orders`: `id`, `user_id`, `status` (pending/paid/shipped/delivered/cancelled), `total_amount`, `payment_key`, `shipping_address`, `created_at`
  - `order_items`: `id`, `order_id`, `post_slug`, `quantity`, `unit_price`
- [ ] 결제 완료 페이지 (`app/checkout/success/page.tsx`)
- [ ] 결제 실패/취소 페이지 (`app/checkout/fail/page.tsx`)
- [ ] 환불 처리 워크플로우 (관리자 페이지)

#### 4.5 작품 예약/주문 관리

- [ ] Notion 데이터베이스 확장
  - `Stock` (Number): 재고 수량
  - `IsOrderable` (Checkbox): 주문 가능 여부
  - `LeadTime` (Text): 제작 소요 기간
  - `OrderType` (Select): 즉시 구매 / 예약 주문 / 맞춤 제작
- [ ] 예약 주문 폼 (`components/orders/reservation-form.tsx`)
  - 맞춤 제작 요청 사항 입력
  - 희망 수령일
  - 추가 옵션 (색상, 크기 변경 등)
- [ ] 재고 관리 로직
  - 결제 완료 시 재고 차감
  - 환불 시 재고 복원
  - 동시성 제어 (Supabase RLS + 트랜잭션)
- [ ] 주문 내역 페이지 (`app/orders/page.tsx`)
  - 사용자별 주문 목록
  - 상태별 필터 (결제완료/배송중/배송완료/취소)
  - 주문 상세 보기

#### 4.6 운영자 관리자 페이지

- [ ] 관리자 대시보드 (`app/admin/page.tsx`)
  - 매출 현황 (일/주/월)
  - 신규 주문 알림
  - 재고 부족 작품 알림
- [ ] 주문 관리 (`app/admin/orders/page.tsx`)
  - 주문 목록 + 상태 변경
  - 송장 번호 입력
  - 환불 처리
- [ ] 회원 관리 (`app/admin/users/page.tsx`)
- [ ] 매출 통계 (`app/admin/analytics/page.tsx`)
  - 작품별 판매량
  - 카테고리별 매출 비중
  - 신규/재방문 구매자 비율
- [ ] 관리자 권한 RBAC (Supabase RLS)

#### 4.7 배송 추적 및 알림

- [ ] 택배사 API 연동 (CJ대한통운, 우체국 등 - 스마트택배 API 활용)
- [ ] 배송 상태 자동 업데이트 (Vercel Cron, 1시간 주기)
- [ ] SMS/카카오 알림톡 발송 (NHN Cloud, 알리고 등)
  - 주문 접수, 결제 완료, 배송 시작, 배송 완료
- [ ] 이메일 알림 (Resend, Phase 3 재활용)

#### 4.8 법적 요구사항 및 보안

- [ ] 통신판매업 신고 (운영자 업무)
- [ ] 약관 페이지 작성
  - 이용약관 (`app/terms/page.tsx`)
  - 개인정보 처리방침 (Phase 3 업데이트)
  - 환불/취소 정책 (`app/refund-policy/page.tsx`)
  - 청약철회 안내
- [ ] PCI-DSS 준수 확인 (PG사 위임으로 대부분 해결)
- [ ] HTTPS 강제 (Vercel 기본 제공)
- [ ] CSP (Content Security Policy) 헤더 설정
- [ ] 보안 감사 (외부 컨설팅 1주)
- [ ] 백업 정책 수립 (Supabase 일일 백업)

### 🎯 완료 기준

- ✅ 카카오/네이버/Google/이메일 4종 로그인 정상 동작
- ✅ 위시리스트 추가/조회/삭제 정상 동작
- ✅ 장바구니 추가 → 결제 → 주문 완료 E2E 플로우 동작
- ✅ Toss Payments 실 결제 테스트 통과 (소액 결제 + 환불 검증)
- ✅ 주문 상태 자동 업데이트 (배송 추적 API 연동)
- ✅ 관리자 대시보드에서 주문/매출/회원 관리 가능
- ✅ 약관 3종(이용/개인정보/환불) 게시 완료
- ✅ 보안 감사 통과 (외부 점검 보고서 수령)
- ✅ Lighthouse Performance ≥ 80 (이커머스 인터랙션 증가로 인한 조정)
- ✅ `npx tsc --noEmit` 타입 에러 0개

### 💡 왜 이 순서일까?

인증 시스템이 없으면 위시리스트/장바구니의 사용자 식별이 불가능하므로 가장 먼저 구축합니다. 위시리스트는 결제 없이도 동작하는 경량 기능이라 장바구니/결제 전 사용자 패턴 검증에 유용합니다. 결제 시스템은 가장 복잡하고 보안 민감도가 높으므로 충분히 검증된 PG사를 선택하고, 사업자 등록·약관 작성 등 비기술 작업과 병렬 진행해야 합니다. 운영 관리자 페이지는 실제 주문이 발생한 후에 우선순위가 명확해집니다.

### 🔧 신규 의존성

```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.x",
    "@tosspayments/payment-sdk": "^1.x",
    "zustand": "^5.x",
    "@hookform/resolvers": "^3.x",
    "date-fns": "^4.x",
    "@tanstack/react-query": "^5.x" (서버 상태 캐싱)
  }
}
```

### ⚙️ 아키텍처 변경 사항

- **인증 계층 도입**: 미들웨어 기반 라우트 보호 (`middleware.ts`)
- **상태 관리 확장**: Zustand로 클라이언트 상태 (장바구니) 관리
- **트랜잭션 처리**: Supabase 함수(PostgreSQL function)로 재고 동시성 제어
- **외부 통합 증가**: PG사, 택배사, SMS/알림톡, 이메일 — 가용성 SLA 모니터링 필요
- **Notion CMS 역할 재정의**: 콘텐츠 + 상품 메타데이터 (재고, 가격, 주문 가능 여부)

---

## 📊 전체 일정 및 마일스톤

| Phase | 주요 작업 | 예상 기간 | 시작 예정일 | 완료 목표일 | 상태 |
|-------|---------|---------|------------|------------|------|
| **MVP (v1.0)** | Notion CMS 기반 블로그 | 1주 | 2026-05-13 | **2026-05-15** | ✅ 완료 |
| **Phase 2** | 검색 및 필터링 고도화 | 3-4주 | 2026-08-01 | 2026-08-31 | ⏳ 대기 |
| **Phase 3** | 커뮤니티 및 참여 | 4-6주 | 2026-11-01 | 2026-12-15 | ⏳ 대기 |
| **Phase 4** | 전자상거래 | 8-10주 | 2027-05-01 | 2027-07-15 | ⏳ 대기 |

> **운영 검증 기간**: 각 Phase 사이의 공백은 의도된 운영 데이터 수집 및 사용자 피드백 반영 시간입니다.

---

## 🔗 의존성 및 선행 조건

```
✅ MVP (v1.0) ─────────── Notion CMS 블로그 (완료)
    │
    │  운영 3개월 + 데이터 수집
    ↓
Phase 2 (검색 및 필터링 고도화)
    │  검색 엔진 + 태그/고급 필터 + 관련 작품 추천
    │  운영 3개월 + 사용자 참여 패턴 분석
    ↓
Phase 3 (커뮤니티 및 참여)
    │  댓글/리뷰 + 뉴스레터 + SNS + 갤러리
    │  운영 6개월 + 수익화 의향 검증
    ↓
Phase 4 (전자상거래)
       인증 + 위시리스트 + 장바구니 + 결제 + 주문 관리
```

**중요**:
- Phase 3에서 도입하는 **Supabase**는 Phase 4의 인증/장바구니/주문 데이터 저장소로 재활용됩니다.
- Phase 2의 **검색 인덱스**는 Phase 3의 갤러리 필터링, Phase 4의 상품 검색에 재활용됩니다.
- Phase 3의 **이메일 인프라(Resend)**는 Phase 4의 주문 알림에 재활용됩니다.

---

## 📝 진행 상황 추적

### Phase별 진행도 요약

| Phase | 전체 작업 | 완료 | 진행도 |
|-------|---------|------|--------|
| **MVP (v1.0)** | 79 | 79 | ✅ 100% |
| Phase 2 | 35 | 0 | 0% |
| Phase 3 | 40 | 0 | 0% |
| Phase 4 | 55 | 0 | 0% |
| **고도화 전체** | **130** | **0** | **0%** |

---

## ⚠️ 주의사항 및 리스크

### Phase 2: 검색 및 필터링 고도화

- **리스크**: Algolia 등 외부 검색 SaaS의 무료 플랜 한도 초과로 비용 발생
  - **대응**: 월간 검색 횟수 모니터링, 한도 초과 시 MeiliSearch 자가 호스팅 전환 검토
- **리스크**: Notion → 검색 엔진 동기화 실패 시 검색 결과 누락
  - **대응**: Vercel Cron 실패 알림 + 수동 재인덱싱 스크립트 항상 가용 상태 유지
- **리스크**: 한국어 검색 품질 저하 (형태소 분석 미흡)
  - **대응**: 검색 솔루션 선정 시 한국어 토크나이저 지원 여부 필수 검증
- **리스크**: SSG 페이지 수 폭증 (태그 페이지 × N개) → 빌드 시간 증가
  - **대응**: 태그별 작품 수가 3개 이하인 태그는 SSG 제외, on-demand ISR로 처리

### Phase 3: 커뮤니티 및 참여

- **리스크**: Supabase 무료 플랜 데이터베이스 용량 초과 (500MB)
  - **대응**: 리뷰 본문 길이 제한, 오래된 비공개 댓글 아카이브, Pro 플랜 전환 시점 사전 계산
- **리스크**: 댓글 스팸/악성 콘텐츠 유입
  - **대응**: Cloudflare Turnstile + 관리자 승인 워크플로우 + 자동 신고 시스템
- **리스크**: 뉴스레터 발송 시 스팸 폴더 분류
  - **대응**: SPF/DKIM/DMARC 도메인 인증 필수 설정, Resend 도메인 평판 관리
- **리스크**: 동적 OG 이미지 생성 비용 (Edge Function 호출 수)
  - **대응**: OG 이미지 CDN 캐싱 (Cache-Control: max-age=31536000), 이미지 URL에 해시 포함
- **리스크**: 갤러리 모드 이미지 로딩 부담
  - **대응**: lazy loading + intersection observer + Next.js Image 컴포넌트 활용

### Phase 4: 전자상거래

- **리스크**: 결제 시스템 보안 취약점 (가장 치명적)
  - **대응**: 서버 사이드 결제 승인 필수, 클라이언트 금액 신뢰 금지, 외부 보안 감사 필수
- **리스크**: 동시성 이슈로 재고 마이너스 발생
  - **대응**: Supabase PostgreSQL 함수 + Row Locking으로 트랜잭션 처리
- **리스크**: 통신판매업 신고 누락으로 법적 리스크
  - **대응**: 베타 출시 전 통신판매업 신고 완료, 약관 3종 변호사 검토
- **리스크**: PG사 가맹점 심사 거부 (개인 사업자 신용 등)
  - **대응**: 2개 이상 PG사 동시 신청, PortOne 같은 멀티 PG 솔루션 활용
- **리스크**: 배송 추적 API 사용량 한도 초과
  - **대응**: 주문 상태별 폴링 빈도 조정 (배송중 1시간/배송완료 24시간)
- **리스크**: 환불/취소 시 회계 처리 복잡도
  - **대응**: 모든 결제/환불 이벤트를 별도 로그 테이블에 영구 보존, 매월 정산 리포트 자동 생성
- **리스크**: 개인정보 침해 사고 시 법적 책임
  - **대응**: 개인정보보호 책임자 지정, 정기 보안 점검, 침해 사고 대응 매뉴얼 작성

---

## 🚀 운영 및 모니터링 계획

### MVP 운영 모니터링 (Phase 2 시작 전)

- Vercel Analytics 도입 (방문자 수, 인기 페이지)
- 핵심 지표 추적
  - 월간 방문자 수 (MAU)
  - 평균 세션 시간
  - 가장 많이 본 카테고리/작품
  - 모바일/데스크탑 비율
- Notion DB 작품 수 증가 추세 (Phase 2 시작 트리거: 50개 이상)

### Phase 2 이후 모니터링

- 검색 사용률 (전체 방문 대비 검색 페이지 방문 비율)
- 검색 결과 0건 검색어 추적
- 태그 클릭률
- 관련 작품 추천 클릭률

### Phase 3 이후 모니터링

- 댓글/리뷰 발생 빈도
- 뉴스레터 구독자 증가 추세 + 이메일 오픈율/클릭률
- SNS 공유 횟수 (채널별)
- 갤러리 모드 사용 빈도

### Phase 4 이후 모니터링

- 회원가입 전환율
- 위시리스트 → 장바구니 → 결제 퍼널 전환율
- 평균 주문 금액 (AOV)
- 재구매율
- 결제 실패율 + 환불율

---

## 🧪 테스트 전략

### Phase 2 테스트

- **단위 테스트** (Vitest): 검색 인덱스 변환 함수, 추천 알고리즘
- **통합 테스트** (Playwright MCP):
  - 검색바에서 검색어 입력 → 결과 페이지 이동 → 작품 클릭
  - 태그 클릭 → 태그 페이지 → 작품 목록 확인
  - 고급 검색 필터 조합 → URL 동기화 → 새로고침 후 상태 유지

### Phase 3 테스트

- **단위 테스트**: 리뷰 별점 계산, 이메일 템플릿 렌더링
- **통합 테스트** (Playwright MCP):
  - 댓글 작성 → 표시 확인 → 관리자 승인 플로우
  - 리뷰 작성 → 평균 별점 업데이트 확인
  - 뉴스레터 구독 → 더블 옵트인 → 신규 글 자동 발송 검증
  - SNS 공유 버튼 동작 + OG 이미지 미리보기
  - 갤러리 라이트박스 키보드/모바일 인터랙션

### Phase 4 테스트

- **단위 테스트**: 결제 금액 계산, 재고 차감 로직, 권한 검증
- **통합 테스트** (Playwright MCP):
  - 회원가입 → 이메일 인증 → 로그인 → 프로필 수정
  - 위시리스트 추가/제거 + 비로그인 → 로그인 시 동기화
  - 장바구니 추가 → 수량 변경 → 결제 페이지 이동
  - Toss Payments 테스트 결제 → 주문 완료 → 주문 내역 확인
  - 관리자 페이지 주문 상태 변경 → 사용자 알림 발송
- **보안 테스트**:
  - SQL Injection, XSS, CSRF 자동 스캔 (OWASP ZAP)
  - 결제 금액 위변조 시도 차단 검증
  - 권한 우회 시도 (다른 사용자 주문 조회 등) 차단 검증
- **부하 테스트**: k6로 동시 100명 결제 시뮬레이션

---

## 💰 예상 비용 분석 (월간)

| 항목 | MVP | Phase 2 | Phase 3 | Phase 4 |
|------|-----|---------|---------|---------|
| Vercel Hosting | $0 (Hobby) | $0 (Hobby) | $20 (Pro) | $20 (Pro) |
| Notion | $0 (Free) | $0 (Free) | $8 (Pro) | $8 (Pro) |
| 검색 엔진 (Algolia) | - | $0-$50 | $50 | $50 |
| Supabase | - | - | $0-$25 | $25 (Pro) |
| Resend (이메일) | - | - | $0-$20 | $20 |
| 도메인 | $1 | $1 | $1 | $1 |
| PG 수수료 | - | - | - | 매출의 2.9% |
| SMS/알림톡 | - | - | - | $10-$50 |
| **합계** | **~$1** | **~$1-$51** | **~$79-$124** | **~$124-$174 + PG수수료** |

> Phase 4부터는 매출 발생 시 수수료가 추가되며, 매출이 인프라 비용을 충분히 상회해야 손익분기점에 도달합니다.

---

## 📚 참고 자료

### 공식 문서
- [PRD 문서](./PRD.md)
- [MVP 로드맵 (완료)](./ROADMAP_v1.md)
- [Next.js 15 Documentation](https://nextjs.org/docs)

### Phase 2
- [Algolia React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [MeiliSearch Documentation](https://www.meilisearch.com/docs)
- [cmdk - Command Menu](https://cmdk.paco.me/)

### Phase 3
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [React Email](https://react.email/)
- [Giscus](https://giscus.app/ko)
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation)

### Phase 4
- [Toss Payments 개발자 센터](https://docs.tosspayments.com/)
- [Auth.js (NextAuth.js v5)](https://authjs.dev/)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [통신판매업 신고 안내](https://www.ftc.go.kr/)

---

**작성자**: Claude Code
**최종 수정**: 2026-05-16
**버전**: 1.0 (Post-MVP)
**상태**: ⏳ Phase 2 대기 중 (운영 데이터 수집 및 우선순위 재검증 단계)
