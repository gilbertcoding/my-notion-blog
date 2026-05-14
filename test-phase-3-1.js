#!/usr/bin/env node

/**
 * Phase 3-1 구현 검증 스크립트
 * lib/notion.ts의 4개 함수가 제대로 작동하는지 확인
 */

async function testPhase31() {
  // ES modules 지원을 위해 dynamic import 사용
  const { getPublishedPosts, getPostBySlug, getPostsByCategory, getCategories } =
    await import('./lib/notion.ts');

  console.log("━".repeat(60));
  console.log("🔍 Phase 3-1 검증 테스트 시작\n");

  try {
    // 1. getPublishedPosts 테스트
    console.log("📋 Test 1: getPublishedPosts()");
    const posts = await getPublishedPosts();
    console.log(`   ✅ 발행된 포스트: ${posts.length}개`);
    if (posts.length > 0) {
      posts.forEach((post, idx) => {
        console.log(`      ${idx + 1}. ${post.title} (${post.category})`);
      });
    }
    console.log("");

    // 2. getCategories 테스트
    console.log("📋 Test 2: getCategories()");
    const categories = await getCategories();
    console.log(`   ✅ 카테고리: ${categories.join(", ")}`);
    console.log("");

    // 3. getPostsByCategory 테스트 (첫 번째 카테고리)
    if (categories.length > 0) {
      console.log(`📋 Test 3: getPostsByCategory("${categories[0]}")`);
      const categoryPosts = await getPostsByCategory(categories[0]);
      console.log(`   ✅ ${categories[0]} 포스트: ${categoryPosts.length}개`);
      console.log("");
    }

    // 4. getPostBySlug 테스트 (첫 번째 포스트)
    if (posts.length > 0) {
      console.log(`📋 Test 4: getPostBySlug("${posts[0].slug}")`);
      const post = await getPostBySlug(posts[0].slug);
      if (post) {
        console.log(`   ✅ 포스트 찾음: ${post.title}`);
        console.log(`      - 설명: ${post.description || "(없음)"}`);
        console.log(`      - 콘텐츠: ${post.content ? post.content.slice(0, 50) + "..." : "(없음)"}`);
      } else {
        console.log(`   ❌ 포스트를 찾을 수 없음`);
      }
      console.log("");
    }

    console.log("━".repeat(60));
    console.log("✅ Phase 3-1 검증 완료\n");
    console.log("다음 단계:");
    console.log("- Phase 3-2: UI 컴포넌트 구현");
    console.log("- Phase 3-3: 홈 페이지 구현");

  } catch (error) {
    console.error("❌ 오류 발생:", error);
    process.exit(1);
  }
}

testPhase31();
