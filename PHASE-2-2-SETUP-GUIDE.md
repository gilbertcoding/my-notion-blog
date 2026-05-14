# Phase 2-2: Notion 데이터베이스 설정 가이드

**상태**: 🔧 작업 필요
**마지막 업데이트**: 2026-05-14
**확인된 사항**:

- ✅ Notion API 키 유효
- ✅ Notion 데이터베이스 생성됨 (ID: `35f011cb10a680ba9811efe22333da6a`)
- ❌ 데이터베이스 필드 미설정
- ❌ 샘플 데이터 미입력

---

## 📌 현재 상태

```
Notion 데이터베이스: "New database"
└── 필드: 설정되지 않음 ❌
└── 샘플 데이터: 없음 ❌
└── 통합 권한: 부분적 ⚠️
```

---

## 🔧 필요한 작업

### Step 1: Notion 웹에서 데이터베이스 열기

1. **Notion 대시보드** 접속: https://notion.so
2. **"New database"** 페이지 열기
   - 또는 이 URL 직접 접속:

### Step 2: 필드(Properties) 추가

데이터베이스의 "+ Add a property" 버튼을 클릭하여 다음 11개 필드를 추가하세요.

#### 필수 필드 (5개)

| 필드명          | 타입   | 설정값               | 비고                   |
| --------------- | ------ | -------------------- | ---------------------- |
| **Title**       | Title  | -                    | 기본값 (이미 존재)     |
| **Category**    | Select | 소품, 의류, 액세서리 | 카테고리 3개 옵션 추가 |
| **ImageUrl**    | URL    | -                    | 작품 메인 이미지 URL   |
| **Status**      | Select | 초안, 발행됨         | 2개 옵션               |
| **PublishedAt** | Date   | -                    | 발행 날짜              |

#### 추가 필드 (6개)

| 필드명      | 타입         | 설정값                      | 비고                       |
| ----------- | ------------ | --------------------------- | -------------------------- |
| Description | Rich Text    | -                           | 150자 이내 짧은 설명       |
| Content     | Rich Text    | -                           | 상세 본문                  |
| Materials   | Multi-select | 펠트, 실, 눈, 단추, 보석 등 | 여러 개 선택 가능          |
| Size        | Text         | -                           | 크기/규격 (예: 10cm x 5cm) |
| Price       | Number       | -                           | 판매 가격 (선택사항)       |
| Tags        | Multi-select | 동물, 선물, 옷, 소품 등     | 자유롭게 추가 가능         |

### Step 3: 샘플 데이터 입력

**발행된 작품 3개** (Status: **발행됨**, 서로 다른 카테고리)

#### 샘플 1: 소품 - 뜨개질 토끼

```
Title: 뜨개질로 만든 귀여운 토끼 인형
Category: 소품
ImageUrl: https://via.placeholder.com/400x300?text=Rabbit+Doll
Status: 발행됨
PublishedAt: 2026-05-10
Description: 부드러운 퍼에 귀여운 표정의 토끼 인형입니다.
Content: # 뜨개질 토끼 인형

이 작품은 스웨덴산 피...

Materials: 펠트, 실, 눈
Size: 15cm x 10cm
Price: 25000
Tags: 동물, 선물
```

#### 샘플 2: 의류 - 인형 옷 세트

```
Title: 인형 친구들을 위한 여름 옷 세트
Category: 의류
ImageUrl: https://via.placeholder.com/400x300?text=Doll+Clothes
Status: 발행됨
PublishedAt: 2026-05-08
Description: 다양한 인형 크기에 맞게 제작한 여름 옷 세트입니다.
Content: # 인형 옷 세트

여름 날씨에 맞는...

Materials: 면, 보석, 실
Size: 다양 (설명 참고)
Price: 35000
Tags: 옷, 선물
```

#### 샘플 3: 액세서리 - 인형용 모자 모음

```
Title: 톡톡 튀는 컬러의 인형 모자 모음
Category: 액세서리
ImageUrl: https://via.placeholder.com/400x300?text=Doll+Hats
Status: 발행됨
PublishedAt: 2026-05-05
Description: 다양한 스타일의 인형용 모자 5개 세트입니다.
Content: # 인형용 모자 모음

각각 다른 색상과...

Materials: 펠트, 단추
Size: 5cm 지름
Price: 18000
Tags: 액세서리
```

#### 샘플 4: 초안 (테스트용)

```
Title: (미정) 새로운 작품 아이디어
Category: 소품
ImageUrl: (비워두기)
Status: 초안
PublishedAt: (비워두기)
Description: (비워두기)
Content: 구상 중...
```

### Step 4: 통합(Integration) 연결 확인

1. Notion 데이터베이스 페이지 우측 상단 "..." 메뉴 클릭
2. "Connections" → "Add connection" 클릭
3. "프로젝트 이름" 통합 선택
4. "Allow access" 클릭으로 권한 부여

### Step 5: 확인

다음 명령어를 실행하여 설정이 완료되었는지 확인하세요:

```bash
cd /var/local/workspace/claude/my-notion-blog-prd
NOTION_API_KEY="ntn_mE2985207423dNrAbXpDwFHttaxvIid8YqFvffOTBZc4YF" \
NOTION_DATABASE_ID="35f011cb10a680198065c2818ea4b535" \
node test-notion-setup-check.js
```

성공 시 출력:

```
✅ Phase 2-2 완료: Phase 3-1 진행 가능
```

---

## 📝 주의사항

### ImageUrl 필드

- **반드시 외부 URL 사용** (Notion 내부 URL은 만료됨)
- 사용 가능한 서비스:
  - [Placeholder Image Service](https://via.placeholder.com) (테스트용)
  - [Imgur](https://imgur.com) (무료)
  - [Cloudinary](https://cloudinary.com) (무료 플랜)
  - 자신의 이미지 호스팅 서비스

### Select/Multi-select 필드

- Notion에서 옵션을 먼저 생성해야 합니다
- 페이지 입력 시 드롭다운에서 선택

### 마크다운 지원

- Content 필드에서 마크다운 문법 사용 가능
- Notion 에디터에서 문법 블록 추가 가능

---

## 🚀 다음 단계

Phase 2-2가 완료되면 Phase 3-1로 진행할 수 있습니다:

### Phase 3-1: 데이터 페칭 레이어 개발

```typescript
// lib/notion.ts 구현
- getPublishedPosts(): Promise<Post[]>
- getPostBySlug(slug: string): Promise<Post | null>
- getPostsByCategory(category: string): Promise<Post[]>
- getCategories(): Promise<string[]>
```

---

## 💡 문제 해결

### Q: API 권한 오류 (403 Forbidden)

**A**: Notion 데이터베이스에 통합이 연결되지 않았습니다.

1. 데이터베이스 "..." 메뉴 → Connections
2. 통합 추가 및 권한 허용

### Q: "properties 미정의" 에러

**A**: 데이터베이스에 필드가 추가되지 않았습니다.

1. Notion 웹에서 데이터베이스 열기
2. "+ Add a property" 클릭
3. 위의 필드 11개 추가

### Q: URL이 유효하지 않다는 에러

**A**: ImageUrl이 외부 URL인지 확인하세요.

- ❌ 잘못됨: `https://prod-files-secure.s3.us-west-2.amazonaws.com/...` (Notion 내부)
- ✅ 올바름: `https://via.placeholder.com/400x300?text=Test`

---

**완료 시점**: Phase 2-2 체크리스트가 모두 완료될 때

- ✅ 데이터베이스 필드 11개 설정
- ✅ 발행된 작품 3개 입력
- ✅ 초안 1개 입력
- ✅ 통합 권한 설정

이후 `test-notion-setup-check.js` 실행으로 확인 가능합니다.
