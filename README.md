# 인형공예 작품전시 블로그 (Notion CMS)

Notion을 CMS로 활용한 현대적인 인형공예 작품 전시 블로그입니다. Notion에서 작품 정보를 관리하면 자동으로 블로그에 반영됩니다.

## 🎯 프로젝트 개요

- **목적**: Notion 데이터베이스를 CMS로 활용하여 인형공예 작품을 전시하는 블로그
- **주요 기능**: 작품 목록 조회, 상세 페이지 표시, 카테고리별 필터링, 반응형 디자인
- **배포**: Vercel에 자동 배포 (ISR 지원)

## ✨ 기술 스택

- **[Next.js v15](https://nextjs.org)** - React 기반 풀스택 프레임워크, SSG/ISR 지원
- **[TypeScript](https://www.typescriptlang.org)** - 타입 안전성을 위한 언어
- **[TailwindCSS v4](https://tailwindcss.com)** - 유틸리티 기반 CSS 프레임워크
- **[shadcn/ui](https://ui.shadcn.com)** - 재사용 가능한 UI 컴포넌트
- **[Lucide React](https://lucide.dev)** - 아름다운 아이콘 라이브러리
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 다크모드 지원
- **[@notionhq/client](https://github.com/makenotion/notion-sdk-js)** - Notion API 클라이언트

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 2. Notion 설정

1. [Notion Developers](https://www.notion.com/my-integrations)에서 새 Integration 생성
2. API 키 복사
3. Notion 워크스페이스에서 블로그용 데이터베이스 생성
4. Integration에 데이터베이스 접근 권한 부여
5. 데이터베이스 ID 확인

### 3. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 편집하여 다음 환경변수를 설정하세요:

```env
# Notion API 키
NOTION_API_KEY=your_notion_api_key_here

# Notion 데이터베이스 ID
NOTION_DATABASE_ID=your_database_id_here
```

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

## 📁 프로젝트 구조

```
├── app/                    # Next.js 앱 라우터
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 - 작품 목록
│   ├── post/[slug]/       # 작품 상세 페이지
│   └── category/[cat]/    # 카테고리별 작품 목록
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── layout/           # navbar, footer, theme-toggle
│   └── providers/        # ThemeProvider 래퍼
├── lib/                  # 유틸리티 함수
│   ├── notion.ts         # Notion API 클라이언트
│   └── utils.ts          # cn() 헬퍼 함수
├── docs/                 # 문서
│   └── PRD.md           # 프로덕션 요구사항 문서
├── public/               # 정적 파일
└── components.json       # shadcn/ui 설정
```

## 🎨 UI 컴포넌트

이 프로젝트는 shadcn/ui를 사용합니다. 새로운 컴포넌트를 추가하려면:

```bash
npx shadcn@latest add [component-name]
```

사용 가능한 컴포넌트:
- Button, Card, Input, Label
- Navigation Menu, Dropdown Menu
- Badge 등

## 🌙 다크모드

다크모드가 기본적으로 설정되어 있습니다:
- 시스템 테마 자동 감지
- 라이트/다크/시스템 모드 전환
- 테마 상태 유지

## 📝 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

## 🔧 사용자 정의

### 테마 색상 변경

`app/globals.css`에서 CSS 변수를 수정하여 테마를 사용자 정의할 수 있습니다.

### 컴포넌트 추가

`components/` 디렉토리에 새로운 컴포넌트를 추가하세요. shadcn/ui 컴포넌트는 `components/ui/`에 자동으로 설치됩니다.

## 🚀 배포

### Vercel (권장)

Vercel에 배포하면 ISR(증분 정적 재생성)을 활용하여 새로운 작품이 추가되면 자동으로 페이지를 갱신합니다.

```bash
# Git 저장소를 GitHub에 푸시 후
# Vercel 대시보드에서 "Import Project" 클릭
# GitHub 저장소 선택
# 환경변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
# Deploy 버튼 클릭
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 환경변수 설정 (Vercel)

Vercel 프로젝트 설정에서 다음 환경변수를 추가하세요:

- `NOTION_API_KEY`: Notion Integration API 키
- `NOTION_DATABASE_ID`: Notion 데이터베이스 ID

## 📚 학습 자료

- [Next.js 문서](https://nextjs.org/docs)
- [TailwindCSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [TypeScript 문서](https://www.typescriptlang.org/docs)

## 📖 추가 정보

- **PRD 문서**: [docs/PRD.md](./docs/PRD.md) - 프로젝트의 상세한 요구사항과 설계 문서
- **구현 단계**: 5단계의 구체적인 구현 계획 포함
- **향후 로드맵**: 추가 기능 계획 (검색, 댓글, 전자상거래 등)

## 📄 라이선스

MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
