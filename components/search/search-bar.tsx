'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { PostSummary } from '@/lib/types/post';
import { createFuseIndex } from '@/lib/search/fuse-config';
import Fuse from 'fuse.js';

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [results, setResults] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const fuseIndexRef = useRef<Fuse<PostSummary> | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 검색 히스토리 로드
  useEffect(() => {
    const saved = localStorage.getItem('search-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // 검색 데이터 로드
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/search');
        if (response.ok) {
          const data: PostSummary[] = await response.json();
          setPosts(data);
          fuseIndexRef.current = createFuseIndex(data);
        }
      } catch (error) {
        console.error('Failed to load search data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open && posts.length === 0) {
      fetchPosts();
    }
  }, [open, posts.length]);

  // Cmd+K / Ctrl+K 단축키
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // 디바운싱된 검색
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.length < 1) {
      setResults([]);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      if (fuseIndexRef.current) {
        const searchResults = fuseIndexRef.current.search(query);
        setResults(searchResults.map((r) => r.item));
      }
    }, 300); // 300ms 디바운싱
  }, []);

  // 히스토리 저장 및 검색
  const handleSelectResult = (slug: string) => {
    if (searchQuery && !history.includes(searchQuery)) {
      const updated = [searchQuery, ...history].slice(0, 5);
      setHistory(updated);
      localStorage.setItem('search-history', JSON.stringify(updated));
    }
    setOpen(false);
    setSearchQuery('');
    setResults([]);
    router.push(`/post/${slug}`);
  };

  // 검색어 클리어
  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
  };

  // 히스토리 항목 클릭
  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    if (fuseIndexRef.current) {
      const searchResults = fuseIndexRef.current.search(query);
      setResults(searchResults.map((r) => r.item));
    }
  };

  return (
    <>
      {/* 검색 버튼 */}
      <Button
        variant="outline"
        size="icon"
        className="mr-2"
        onClick={() => setOpen(true)}
        aria-label="검색"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* 검색 다이얼로그 */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <CommandInput
            placeholder="작품 검색... (Cmd+K)"
            value={searchQuery}
            onValueChange={handleSearch}
            disabled={isLoading}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-3 p-1"
              aria-label="검색 클리어"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <CommandList>
          <CommandEmpty>
            {isLoading ? '로딩 중...' : '검색 결과가 없습니다.'}
          </CommandEmpty>

          {/* 검색 결과 */}
          {results.length > 0 && (
            <CommandGroup heading="검색 결과">
              {results.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.slug}
                  onSelect={() => handleSelectResult(post.slug)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-1 w-full">
                    <div className="font-medium text-sm">{post.title}</div>
                    {post.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {post.description}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {post.category}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* 히스토리 (검색어 없을 때만) */}
          {!searchQuery && history.length > 0 && (
            <CommandGroup heading="최근 검색">
              {history.map((query) => (
                <CommandItem
                  key={query}
                  value={query}
                  onSelect={() => handleHistoryClick(query)}
                  className="cursor-pointer"
                >
                  <Search className="h-4 w-4 mr-2 opacity-60" />
                  <span className="text-sm">{query}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
