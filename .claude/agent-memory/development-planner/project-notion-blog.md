---
name: project-notion-blog
description: 인형공예 작품전시 블로그 프로젝트 현황 - Notion CMS 기반 Next.js 15 블로그, Phase 3-2 완료 (2026-05-14)
metadata:
  type: project
---

인형공예 작품전시 블로그 프로젝트가 Phase 3-2 완료 상태 (2026-05-14 기준).

**Why:** Notion을 CMS로 사용하여 비개발자도 콘텐츠를 쉽게 관리할 수 있는 블로그를 구축 중. MVP 완료 목표일은 2026-05-20으로 앞당겨졌으며, 최종 마감은 2026-06-02.

**How to apply:** Phase 1~2 완료, Phase 3의 3.1~3.3 및 3.4 일부(getPublishedPosts 호출 + PostGrid 연결)가 완료된 상태. 다음 작업은 3.4 페이지네이션, 3.5 포스트 상세 페이지, 3.6 카테고리 페이지 구현.

## Phase 1 완료 (100%)
- @notionhq/client v5.21.0 설치 완료
- lib/env.ts 환경 변수 타입 정의 완료
- lib/types/notion.ts, post.ts, page.ts 타입 파일 완료
- lib/notion-client.ts 클라이언트 싱글톤 완료
- .env.local 생성 및 NOTION_API_KEY, NOTION_DATABASE_ID 입력 완료
- API 연결 테스트 완료 (데이터베이스 존재 확인됨)
- 폴더 구조: components/post/, components/common/, app/post/[slug]/, app/category/[category]/ 생성 완료

## Phase 2 완료 (100%, 2026-05-14)
- 2.1 Notion 워크스페이스 준비: 완료 (Integration 생성, API 키 등록)
- 2.2 데이터베이스 필드 설정: 완료 (11개 필드 추가)
- 2.3 샘플 데이터 입력: 완료 (발행 4개 이상 + 초안 포함)
- 2.4 API 권한 설정: 완료
- 2.5 정렬/필터 확인: 완료

## Phase 3 현황 (40%, 진행 중)
- 3.1 데이터 페칭 레이어 (lib/notion.ts): 완료
  - getPublishedPosts(), getPostBySlug(), getPostsByCategory(), getCategories() 4개 함수 모두 구현
  - REST API 방식으로 Notion 데이터 페칭, TypeScript 타입 체크 에러 0개
- 3.2 유틸리티 함수 (lib/utils.ts): 완료 (createSlug, formatDate, truncateText)
- 3.3 포스트 관련 컴포넌트: 완료 (PostCard, PostGrid, CategoryBadge, PostMeta)
  - next.config.ts에 via.placeholder.com 이미지 도메인 추가됨
- 3.4 홈 페이지 (app/page.tsx): 부분 완료
  - getPublishedPosts() 호출 및 PostGrid 연결 완료
  - 브라우저에서 Notion 작품 카드 4개 정상 표시 확인
  - 페이지네이션 및 ISR 설정은 미완료
- 3.5 포스트 상세 페이지: 미완료
- 3.6 카테고리 페이지: 미완료

## Phase 구조 (PRD 기반 5단계)
1. 환경 설정 및 초기화 (1-2일) — 완료 100%
2. Notion 데이터베이스 생성 (1일) — 완료 100% (2026-05-14)
3. 핵심 기능 구현 (3-4일) — 진행 중 40%
4. 스타일링 및 최적화 (1-2일) — 대기
5. 테스트 및 배포 (1일) — 대기

관련: [[roadmap-patterns-nextjs-notion]]
