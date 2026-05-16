import { Suspense } from 'react';
import { SearchResults } from './search-results';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchPageLoading() {
  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
        <p className="text-lg text-muted-foreground">로딩 중...</p>
      </div>
    </div>
  );
}
