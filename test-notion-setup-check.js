#!/usr/bin/env node

/**
 * Notion API 초기 설정 상태 확인
 *
 * Phase 2-2 작업 진행을 위해 필요한 사항:
 * 1. Notion 데이터베이스 생성
 * 2. 필드 추가 및 설정
 * 3. 샘플 데이터 입력
 */

const { Client } = require("@notionhq/client");

async function checkSetup() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  const notion = new Client({ auth: apiKey });

  console.log("━".repeat(60));
  console.log("🔍 Notion API 초기 설정 상태 확인\n");

  try {
    // 1. 데이터베이스 기본 정보
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const dbTitle = database.title
      ?.map((t) => t.plain_text)
      .join("")
      .trim() || "Untitled";

    console.log(`✅ 데이터베이스 찾음: "${dbTitle}"`);
    console.log(`   URL: ${database.url}\n`);

    // 2. 데이터베이스에 설정된 필드 확인
    console.log("📋 Step 1: 데이터베이스 필드 상태");
    if (database.properties) {
      const fields = Object.keys(database.properties);
      console.log(`   ✅ 필드 설정됨: ${fields.length}개`);
      fields.forEach((field) => {
        const prop = database.properties[field];
        console.log(`      - ${field} (${prop.type})`);
      });
    } else {
      console.log(
        `   ❌ 필드가 설정되지 않음 (properties 미정의)`
      );
      console.log(`\n   🔧 해결 방법:`);
      console.log(`   1. Notion 웹에서 해당 데이터베이스 열기`);
      console.log(`   2. 데이터베이스 헤더의 "+" 버튼 클릭`);
      console.log(`   3. 다음 필드 추가:`);
      console.log(`      - Title (텍스트, 필수 - 기본값)`);
      console.log(`      - Category (Select)`);
      console.log(`      - ImageUrl (URL)`);
      console.log(`      - Status (Select: '발행됨', '초안')`);
      console.log(`      - Description (Rich Text)`);
      console.log(`      - Content (Rich Text)`);
      console.log(`      - PublishedAt (Date)`);
      console.log(`      - Materials (Multi-select)`);
      console.log(`      - Size (Text)`);
      console.log(`      - Price (Number)`);
      console.log(`      - Tags (Multi-select)\n`);
    }

    // 3. 데이터베이스에 페이지 조회
    console.log("📋 Step 2: 데이터베이스 페이지 조회");
    const pages = await notion.databases.query({
      database_id: databaseId,
    });

    console.log(`   현재 페이지: ${pages.results.length}개`);
    if (pages.results.length > 0) {
      console.log(`   최근 페이지 (${Math.min(3, pages.results.length)}개):`);
      pages.results.slice(0, 3).forEach((page, idx) => {
        const createdTime = new Date(page.created_time).toLocaleDateString(
          "ko-KR"
        );
        console.log(`      ${idx + 1}. ${page.id.slice(0, 8)}... (${createdTime})`);
      });
    } else {
      console.log(`   ⚠️  아직 페이지가 없습니다\n`);
    }

    // 4. 다음 단계 안내
    console.log("\n━".repeat(60));
    console.log("📌 Phase 2-2 진행 상황:\n");

    const fieldsMissing = !database.properties;
    const dataInvalid = pages.results.length < 3;

    if (fieldsMissing && dataInvalid) {
      console.log("❌ Phase 2-2 미완료: 필드 설정 + 샘플 데이터 입력 필요\n");
      console.log("✅ 완료 체크리스트:");
      console.log("   ☐ Notion에서 11개 필드 추가");
      console.log("   ☐ 발행된 작품 3개 입력 (서로 다른 카테고리)");
      console.log("   ☐ 초안 1개 입력");
      console.log("   ☐ 모든 필드 값 채우기\n");
    } else if (fieldsMissing) {
      console.log("⚠️  Phase 2-2 진행중: 필드 설정 필요\n");
      console.log("✅ 완료 체크리스트:");
      console.log("   ☐ Notion에서 11개 필드 추가");
      console.log("   ✓ 데이터 입력됨 (" + pages.results.length + "개)\n");
    } else if (dataInvalid) {
      console.log("⚠️  Phase 2-2 진행중: 샘플 데이터 입력 필요\n");
      console.log("✅ 완료 체크리스트:");
      console.log("   ✓ 필드 설정됨\n");
      console.log("   ☐ 발행된 작품 3개 입력 (현재: " +
        pages.results.length +
        "개)");
      console.log("   ☐ 초안 1개 입력\n");
    } else {
      console.log("✅ Phase 2-2 완료: Phase 3-1 진행 가능\n");
    }

    console.log("━".repeat(60));
  } catch (error) {
    console.error("❌ 오류 발생:", error.message);
    process.exit(1);
  }
}

checkSetup();
