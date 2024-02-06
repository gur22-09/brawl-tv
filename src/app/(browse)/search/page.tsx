import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Results, ResultsSkeleton } from './_components/results';
import { Suspense } from 'react';

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

export const metadata: Metadata = {
  title: 'Search',
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.query) {
    redirect('/');
  }

  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.query} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
