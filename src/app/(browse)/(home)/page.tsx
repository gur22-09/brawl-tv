import { Suspense } from 'react';
import { Feed, FeedSkeleton } from './_components/feed';

export default async function Home() {
  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </div>
  );
}
