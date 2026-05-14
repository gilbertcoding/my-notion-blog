#!/usr/bin/env node

/**
 * Notion API 연결 테스트 및 데이터베이스 검증 스크립트
 *
 * 사용법:
 *   NOTION_API_KEY="..." NOTION_DATABASE_ID="..." node test-notion-api.js
 */

const { Client } = require("@notionhq/client");

async function testNotionAPI() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    console.error("❌ 환경 변수 누락:");
    console.error(`   NOTION_API_KEY: ${apiKey ? "설정됨" : "❌ 누락"}`);
    console.error(`   NOTION_DATABASE_ID: ${databaseId ? "설정됨" : "❌ 누락"}`);
    process.exit(1);
  }

  const notion = new Client({ auth: apiKey });

  console.log("🔍 Notion API 연결 테스트 시작...\n");

  try {
    // 1. 데이터베이스 메타데이터 조회
    console.log("📋 Step 1: 데이터베이스 메타데이터 조회");
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log("✅ 데이터베이스 연결 성공");
    console.log(`   Title: ${database.title?.map((t) => t.plain_text).join("")}`);
    console.log(`   Properties: ${Object.keys(database.properties).length}개\n`);

    // 2. 데이터베이스 필드 확인
    console.log("📍 Step 2: 데이터베이스 필드 검증");
    const requiredFields = [
      "Title",
      "Category",
      "ImageUrl",
      "Status",
      "PublishedAt",
    ];
    const existingFields = Object.keys(database.properties);

    console.log(`   필드 목록 (${existingFields.length}개):`);
    existingFields.forEach((field) => {
      const isRequired = requiredFields.includes(field);
      console.log(`   ${isRequired ? "✅" : "  "} ${field}`);
    });

    const missingFields = requiredFields.filter(
      (f) => !existingFields.includes(f)
    );
    if (missingFields.length > 0) {
      console.log(`\n   ⚠️  누락된 필수 필드: ${missingFields.join(", ")}`);
    } else {
      console.log(`\n   ✅ 필수 필드 모두 존재\n`);
    }

    // 3. 발행된 글 조회
    console.log("📍 Step 3: 발행된 글 조회 (Status = '발행됨')");
    const publishedPosts = await notion.databases.query({
      database_id: databaseId,
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
    });

    console.log(`   발행된 글: ${publishedPosts.results.length}개`);
    if (publishedPosts.results.length > 0) {
      publishedPosts.results.slice(0, 3).forEach((page, idx) => {
        const titleProp = page.properties.Title;
        const title =
          titleProp?.type === "title"
            ? titleProp.title?.map((t) => t.plain_text).join("")
            : "제목 없음";
        console.log(`     ${idx + 1}. ${title}`);
      });
      if (publishedPosts.results.length > 3) {
        console.log(`     ... 그 외 ${publishedPosts.results.length - 3}개\n`);
      } else {
        console.log("");
      }
    } else {
      console.log(
        `   ⚠️  발행된 글이 없습니다. 샘플 데이터를 입력해주세요.\n`
      );
    }

    // 4. 초안 글 조회
    console.log("📍 Step 4: 초안 글 조회 (Status = '초안')");
    const draftPosts = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: {
          equals: "초안",
        },
      },
    });

    console.log(`   초안: ${draftPosts.results.length}개`);
    if (draftPosts.results.length > 0) {
      draftPosts.results.slice(0, 2).forEach((page, idx) => {
        const titleProp = page.properties.Title;
        const title =
          titleProp?.type === "title"
            ? titleProp.title?.map((t) => t.plain_text).join("")
            : "제목 없음";
        console.log(`     ${idx + 1}. ${title}`);
      });
    }

    // 5. 카테고리 목록 추출
    console.log("\n📍 Step 5: 사용 가능한 카테고리");
    const allPages = await notion.databases.query({
      database_id: databaseId,
    });

    const categories = new Set();
    allPages.results.forEach((page) => {
      const categoryProp = page.properties.Category;
      if (categoryProp?.type === "select" && categoryProp.select?.name) {
        categories.add(categoryProp.select.name);
      }
    });

    if (categories.size > 0) {
      console.log(`   ${Array.from(categories).join(", ")}\n`);
    } else {
      console.log(`   ⚠️  설정된 카테고리가 없습니다.\n`);
    }

    // 최종 결과
    console.log("━".repeat(60));
    console.log("✅ Notion API 연결 테스트 완료!\n");

    if (publishedPosts.results.length >= 3) {
      console.log("✅ Phase 2-2 준비 완료: 샘플 데이터 3개 이상 존재");
      console.log("   → Phase 3-1 (데이터 페칭 함수 구현) 진행 가능\n");
    } else {
      console.log("⚠️  Phase 2-2 작업 필요: 샘플 데이터 입력 필요");
      console.log(
        `   현재: 발행된 글 ${publishedPosts.results.length}개 (필요: 3개)\n`
      );
    }

    console.log("다음 단계:");
    console.log("1. Notion 데이터베이스에서 샘플 글 입력 확인");
    console.log("2. Status가 '발행됨'인 글이 최소 3개 있는지 확인");
    console.log("3. 각 글의 Category가 서로 다른지 확인");
  } catch (error) {
    console.error("❌ 오류 발생:");
    if (error.code === "validation_error") {
      console.error(
        "   - API 응답 유효성 검사 실패 (database_id가 올바른지 확인)"
      );
    } else if (error.code === "unauthorized") {
      console.error("   - 인증 실패 (NOTION_API_KEY가 올바른지 확인)");
    } else if (error.code === "object_not_found") {
      console.error("   - 데이터베이스를 찾을 수 없음 (NOTION_DATABASE_ID 확인)");
    } else {
      console.error(`   - ${error.message}`);
    }
    console.error("\n상세 에러:");
    console.error(error);
    process.exit(1);
  }
}

testNotionAPI();
