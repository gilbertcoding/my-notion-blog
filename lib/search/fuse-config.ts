import Fuse, { IFuseOptions } from 'fuse.js';
import { PostSummary } from '@/lib/types/post';

// Fuse.js 검색 설정 (가중치 포함)
export const fuseOptions: IFuseOptions<PostSummary> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'category', weight: 0.1 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.3, // 유사도 임계값 (0=정확, 1=모두)
  includeScore: true,
  includeMatches: true, // 하이라이트용
  minMatchCharLength: 2,
};

// Fuse.js 인스턴스 생성 함수
export function createFuseIndex(posts: PostSummary[]): Fuse<PostSummary> {
  return new Fuse(posts, fuseOptions);
}

// 검색 결과 타입
export interface SearchResult {
  item: PostSummary;
  score: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: Array<[number, number]>;
  }>;
}
