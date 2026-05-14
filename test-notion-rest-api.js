#!/usr/bin/env node

/**
 * Notion REST API를 직접 사용한 검증 스크립트
 * @notionhq/client 대신 fetch API 사용
 */

async function testNotionAPI() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    console.error("❌ 환경 변수 누락");
    console.error(`   NOTION_API_KEY: ${apiKey ? "설정됨" : "누락"}`);
    console.error(`   NOTION_DATABASE_ID: ${databaseId ? "설정됨" : "누락"}`);
    process.exit(1);
  }

  const baseUrl = "https://api.notion.com/v1";
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  };

  console.log("━".repeat(60));
  console.log("🔍 Notion API REST 직접 호출 검증\n");

  try {
    // 1. 데이터베이스 메타데이터 조회
    console.log("📋 Step 1: 데이터베이스 조회");
    const dbResponse = await fetch(
      `${baseUrl}/databases/${databaseId}`,
      {
        headers,
      }
    );

    if (!dbResponse.ok) {
      throw new Error(
        `DB 조회 실패: ${dbResponse.status} ${dbResponse.statusText}`
      );
    }

    const database = await dbResponse.json();
    console.log(`✅ 데이터베이스 찾음`);
    console.log(`   이름: ${database.title?.map((t) => t.plain_text).join("")}`);
    console.log(`   ID: ${database.id}\n`);

    // 2. 데이터베이스 필드 확인
    console.log("📋 Step 2: 데이터베이스 필드 확인");
    if (database.properties) {
      const fields = Object.keys(database.properties);
      console.log(`✅ 필드 발견: ${fields.length}개`);
      fields.forEach((field) => {
        const prop = database.properties[field];
        console.log(`   - ${field} (${prop.type})`);
      });
      console.log("");
    } else {
      console.log("❌ 필드 정보 없음\n");
    }

    // 3. 데이터베이스 페이지 조회
    console.log("📋 Step 3: 데이터베이스 페이지 조회");
    const pagesResponse = await fetch(
      `${baseUrl}/databases/${databaseId}/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          filter: {
            property: "Status",
            select: {
              equals: "발행됨",
            },
          },
          sorts: [
            {
              property: "PublishedAt",
              direction: "descending",
            },
          ],
        }),
      }
    );

    if (!pagesResponse.ok) {
      const errorData = await pagesResponse.json();
      throw new Error(
        `페이지 조회 실패: ${errorData.message || pagesResponse.statusText}`
      );
    }

    const pagesData = await pagesResponse.json();
    console.log(`✅ 발행된 페이지: ${pagesData.results.length}개`);

    if (pagesData.results.length > 0) {
      console.log(`   최근 페이지:`);
      pagesData.results.slice(0, 3).forEach((page, idx) => {
        const titleProp = page.properties.Title;
        const title =
          titleProp?.type === "title"
            ? titleProp.title?.map((t) => t.plain_text).join("")
            : "제목 없음";
        console.log(`     ${idx + 1}. ${title}`);
      });
    }
    console.log("");

    // 4. 초안 조회
    console.log("📋 Step 4: 초안 페이지 조회");
    const draftResponse = await fetch(
      `${baseUrl}/databases/${databaseId}/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          filter: {
            property: "Status",
            select: {
              equals: "초안",
            },
          },
        }),
      }
    );

    let draftCount = 0;
    if (draftResponse.ok) {
      const draftData = await draftResponse.json();
      draftCount = draftData.results.length;
      console.log(`✅ 초안: ${draftCount}개\n`);
    }

    // 5. 최종 결과
    console.log("━".repeat(60));
    console.log("📊 최종 검증 결과\n");

    const hasFields = database.properties &&
                     Object.keys(database.properties).length >= 11;
    const hasPublished = pagesData.results.length >= 3;
    const hasDraft = draftCount >= 1;

    console.log(`필드 설정: ${hasFields ? "✅ 완료 (11개 이상)" : "❌ 필요"}`);
    console.log(`발행된 글: ${hasPublished ? "✅ 완료 (3개 이상)" : "❌ 필요"}`);
    console.log(`초안: ${hasDraft ? "✅ 완료 (1개 이상)" : "❌ 필요"}`);

    if (hasFields && hasPublished && hasDraft) {
      console.log("\n✅ Phase 2-2 완료: Phase 3-1 진행 가능\n");
    } else {
      console.log("\n⚠️  Phase 2-2 미완료: 위의 필수 항목 확인 필요\n");
    }

    console.log("━".repeat(60));
  } catch (error) {
    console.error("❌ 오류 발생:");
    console.error(`   ${error.message}\n`);
    console.error("해결 방법:");
    console.error("   1. DATABASE_ID가 올바른지 확인");
    console.error("   2. API 키가 유효한지 확인");
    console.error("   3. 통합이 데이터베이스에 연결되었는지 확인");
    console.error("      (Notion 웹에서 ... → Connections → my-notion-blog-prd 확인)");
    process.exit(1);
  }
}

testNotionAPI();
