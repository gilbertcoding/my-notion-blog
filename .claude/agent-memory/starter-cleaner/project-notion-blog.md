---
name: project-notion-blog
description: 인형공예 작품전시 블로그 프로젝트 초기 설정 현황 및 주의사항
metadata:
  type: project
---

이 프로젝트는 Notion을 CMS로 활용하는 인형공예 작품전시 블로그이며, Phase 1 초기화 완료 상태입니다.

**Why:** PRD와 ROADMAP에 따라 5단계 개발 계획을 따르며, 현재 Phase 1(환경 설정) 완료 단계입니다.

**How to apply:** Phase 2부터는 lib/notion.ts의 TODO 주석을 따라 getNotionClient()로 실제 Notion API 연동을 구현하면 됩니다.

## 핵심 결정사항

- `serverEnv`를 즉시 실행 대신 `getServerEnvVars()` 함수로 변경 — 빌드 타임 환경변수 누락 오류 방지
- `getNotionClient()` 팩토리 패턴 — 싱글톤 대신 함수로, 서버 컴포넌트에서 호출 시 env 검증
- `globals.css`에서 사이드바 관련 CSS 변수 제거 — 이 프로젝트에 사이드바 없음

## 알려진 환경 이슈

- lucide-react@0.543.0이 설치 시 dist/cjs 파일이 누락되는 문제 발생 → node_modules 디렉토리 삭제 후 `npm install`로 해결
- eslint-config-next에서 `core-web-vitals` 플러그인 사용 시 `eslint-plugin-jsx-a11y`의 `flat-config-base` 로딩 실패 → eslint.config.mjs에서 `next/typescript`만 extend하도록 변경
- `es-abstract` 패키지 누락으로 인한 ESLint 오류 → devDependencies에 추가로 해결

## 개발 진행 상황 (2026-05-13 기준)

- Phase 1 완료: 환경 설정, 타입 정의, 폴더 구조, Notion 클라이언트 기반
- Phase 2 대기: lib/notion.ts의 TODO를 실제 Notion API 호출로 구현
