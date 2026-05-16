'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { PostSummary } from '@/lib/types/post';
import { PostGrid } from '@/components/post/post-grid';
import { createFuseIndex } from '@/lib/search/fuse-config';
import Fuse from 'fuse.js';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fuseIndexRef = useRef<Fuse<PostSummary> | null>(null);

  useEffect(() => {
    const fetchAndSearch = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/search');
        if (response.ok) {
          const data: PostSummary[] = await response.json();

          if (query.length > 0) {
            const fuse = createFuseIndex(data);
            fuseIndexRef.current = fuse;
            const searchResults = fuse.search(query);
            setResults(searchResults.map((r) => r.item));
          } else {
            setResults([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSearch();
  }, [query]);

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
        {query && (
          <p className="text-lg text-muted-foreground">
            '<strong>{query}</strong>' 검색 결과: <strong>{results.length}</strong>개
          </p>
        )}
        {!query && (
          <p className="text-lg text-muted-foreground">
            검색어를 입력해주세요.
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      ) : results.length > 0 ? (
        <PostGrid posts={results} />
      ) : query.length > 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            '{query}'에 맞는 작품이 없습니다.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            다른 검색어를 시도해보세요.
          </p>
        </div>
      ) : null}
    </div>
  );
}
