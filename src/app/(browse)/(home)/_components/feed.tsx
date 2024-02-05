import { getStreams } from '@/lib/feed-service';
import { FeedCard, FeedCardSkeleton } from './feed-card';
import { Skeleton } from '@/components/ui/skeleton';

export const Feed = async () => {
  const feed = await getStreams();

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Streams you&apos;ll like</h2>
      {feed.length == 0 && (
        <div className="text-sm text-muted-foreground">No streams found</div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {feed.map((f) => (
          <FeedCard {...f} key={f.id} />
        ))}
      </div>
    </div>
  );
};

export const FeedSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px] bg-slate-200" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <FeedCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
