---
name: roadmap-patterns-nextjs-notion
description: Next.js + Notion API 프로젝트의 Phase 구조 패턴 및 시간 추정 데이터
metadata:
  type: project
---

## Next.js + Notion API 블로그 프로젝트 패턴

### Phase 순서 (검증된 의존성 순서)
환경 설정 → Notion DB 생성 → 핵심 기능 → 스타일링/최적화 → 테스트/배포

**Why:** Notion DB ID가 확정되어야 API 호출 테스트가 가능하므로, DB 생성을 환경 설정 직후에 배치해야 함. 기능 없이 스타일링하면 구조 변경 시 스타일 재작성 낭비 발생.

**How to apply:** 이 프로젝트 또는 유사 프로젝트 로드맵 작성 시 이 순서 유지.

### 시간 추정 데이터
- Notion API 패키지 설치 + 타입 정의 + 클라이언트: 0.5-1일
- Notion DB 생성 + 샘플 데이터 + 권한 설정: 0.5-1일
- 데이터 페칭 4개 함수 (getPublishedPosts, getPostBySlug, getPostsByCategory, getCategories): 1-2일
- 3개 페이지 (홈, 상세, 카테고리) + SSG/ISR: 1.5-2일
- 컴포넌트 4종 (PostCard, PostGrid, CategoryBadge, PostMeta): 1일
- 스타일링 완성 + 다크 모드 검증: 0.5-1일
- SEO (generateMetadata, sitemap, robots): 0.5일
- Vercel 배포: 0.5일

### 주요 리스크 패턴
1. Notion Rich Text 렌더링 복잡도 → notion-to-md 라이브러리 도입 검토
2. Notion API Rate Limit (3 RPS) → ISR 캐싱으로 빌드 타임 집중
3. 외부 이미지 URL 만료 → next.config.ts remotePatterns 설정 + 외부 호스팅 필수
4. SSG 빌드 시간 → 글 수 많아질 때 페이지네이션으로 generateStaticParams 분산

### 완료 기준 핵심 지표
- TypeScript: npx tsc --noEmit 에러 0개
- 빌드 시간: < 30초
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
