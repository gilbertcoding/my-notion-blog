const { Client } = require("@notionhq/client");

async function testNotionDatabase() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const dbId = process.env.NOTION_DATABASE_ID;
    console.log("🔍 Notion 데이터베이스 테스트 시작...\n");

    // 1. 데이터베이스 메타데이터 조회
    console.log("1️⃣  데이터베이스 조회 중...");
    const dbResponse = await notion.databases.retrieve({
      database_id: dbId,
    });

    console.log(`✅ 데이터베이스 조회 성공\n`);
    
    // 응답 구조 확인
    if (!dbResponse.properties) {
      console.log("⚠️  필드 정보를 찾을 수 없습니다.");
      console.log("응답 객체:", JSON.stringify(Object.keys(dbResponse), null, 2));
    } else {
      // 2. 필드 목록 출력
      console.log("2️⃣  데이터베이스 필드 목록:");
      const properties = dbResponse.properties;
      const fieldCount = Object.keys(properties).length;
      console.log(`   총 ${fieldCount}개 필드:\n`);
      
      Object.entries(properties).forEach(([key, prop]) => {
        console.log(`   ✓ ${key.padEnd(20)} (${prop.type})`);
      });
    }

    // 3. 현재 데이터 조회
    console.log("\n3️⃣  현재 저장된 데이터:");
    const queryResponse = await notion.databases.query({
      database_id: dbId,
    });

    console.log(`   총 ${queryResponse.results.length}개의 페이지 발견\n`);

    if (queryResponse.results.length > 0) {
      console.log("📝 페이지 목록:");
      queryResponse.results.slice(0, 5).forEach((page, idx) => {
        const props = page.properties;
        const title = props.title ? props.title.title?.[0]?.plain_text : "제목 없음";
        console.log(`   ${idx + 1}. "${title}"`);
      });
    } else {
      console.log("   ⚠️  저장된 페이지가 없습니다.\n");
      console.log("📝 다음 단계: Notion에서 수동으로 샘플 데이터 입력");
    }

    console.log("\n✅ 연결 성공!");

  } catch (error) {
    console.error("❌ 오류 발생:", error.message);
  }
}

testNotionDatabase();
