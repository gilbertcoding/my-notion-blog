#!/usr/bin/env node

const { Client } = require("@notionhq/client");

async function debugConnection() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  console.log("━".repeat(60));
  console.log("🔍 Notion API 통합 권한 진단\n");

  const notion = new Client({ auth: apiKey });

  try {
    // 1. 데이터베이스 기본 정보 조회
    console.log("Step 1: 데이터베이스 연결 테스트");
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log("✅ 데이터베이스 연결 성공");
    console.log(`   ID: ${database.id}`);
    console.log(`   이름: ${database.title?.map((t) => t.plain_text).join("")}\n`);

    // 2. 데이터베이스 객체 상세 분석
    console.log("Step 2: 데이터베이스 객체 분석");
    console.log(`   - object: ${database.object}`);
    console.log(`   - 부모 타입: ${database.parent?.type}`);
    console.log(`   - is_inline: ${database.is_inline}`);
    console.log(
      `   - properties 필드 존재: ${database.properties ? "✅ 있음" : "❌ 없음"}\n`
    );

    // 3. 페이지 조회 시도
    console.log("Step 3: 데이터베이스 페이지 조회 시도");
    console.log(`   available methods:`);
    console.log(
      `   - notion.databases: ${Object.keys(notion.databases).join(", ")}`
    );

    // 페이지 직접 조회 시도
    if (database.id) {
      try {
        console.log(
          `\n   notion.databases.query 호출 시도... (method 존재 여부 확인)`
        );
        if (typeof notion.databases.query === "function") {
          console.log("   ✅ query 메서드 존재");
          const pages = await notion.databases.query({
            database_id: databaseId,
          });
          console.log(`   ✅ 페이지 조회 성공: ${pages.results.length}개\n`);
        } else {
          console.log("   ❌ query 메서드 없음\n");
          console.log("   대안: pages API 직접 사용 시도...");

          // 페이지 검색 API 사용
          const pages = await notion.search({
            query: "",
            filter: {
              value: "database",
              property: "object",
            },
          });
          console.log(
            `   ✅ search API 성공: ${pages.results.length}개 DB 찾음\n`
          );
        }
      } catch (pageError) {
        console.log(`   ❌ 페이지 조회 실패: ${pageError.message}\n`);
      }
    }

    // 4. 진단 결과
    console.log("━".repeat(60));
    console.log("📊 진단 결과\n");

    if (!database.properties) {
      console.log("❌ 문제: database.properties가 undefined");
      console.log(
        "   → API가 데이터베이스 스키마 정보를 반환하지 않음\n"
      );
      console.log("🔧 해결 방법:");
      console.log("   1. Notion 데이터베이스 URL 확인");
      console.log(
        `      현재: https://www.notion.so/${databaseId.replace(/-/g, "")}`
      );
      console.log("   2. 통합 권한 연결 확인:");
      console.log("      - Notion 데이터베이스 열기");
      console.log('      - 우측 상단 "..." 메뉴 클릭');
      console.log('      - "Connections" 또는 "Add connections" 클릭');
      console.log('      - "my-notion-blog-prd" 통합 찾아서 "Allow access" 클릭');
      console.log(
        '\n   3. 데이터베이스가 "인라인 데이터베이스"가 아닌지 확인'
      );
      console.log("      - Notion 웹에서 테이블 형식으로 표시되어야 함\n");
    } else {
      console.log("✅ database.properties 존재");
      const propCount = Object.keys(database.properties).length;
      console.log(`   필드 개수: ${propCount}개`);
      console.log(
        `   필드: ${Object.keys(database.properties).join(", ")}\n`
      );
    }

    console.log("━".repeat(60));
  } catch (error) {
    console.error("❌ 오류 발생:");
    console.error(`   코드: ${error.code}`);
    console.error(`   메시지: ${error.message}\n`);

    if (error.code === "object_not_found") {
      console.error("🔧 해결 방법:");
      console.error("   - DATABASE_ID가 올바른지 확인");
      console.error(
        "   - Notion에서 해당 데이터베이스에 통합을 연결했는지 확인"
      );
    } else if (error.code === "unauthorized") {
      console.error("🔧 해결 방법:");
      console.error("   - NOTION_API_KEY가 올바른지 확인");
    }
  }
}

debugConnection();
