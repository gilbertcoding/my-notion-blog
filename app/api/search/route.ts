import { getPublishedPosts } from '@/lib/notion';

export const revalidate = 3600; // 1시간 ISR 캐싱

export async function GET() {
  try {
    const posts = await getPublishedPosts();

    // PostSummary 타입에 맞춰 응답 (title, description, category, imageUrl, slug 등)
    return Response.json(posts, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch posts for search:', error);
    return Response.json([], {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
