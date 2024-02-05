import { getSearchResults } from '@/lib/search-service';
import { Result, ResultSkeleton } from './result';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultsProps {
  term: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearchResults(term);
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Results for term {term}</h2>
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No results found. Try searching something else
        </p>
      )}
      {data.map(({ id, isLive, name, thumbnailUrl, updatedAt, user }) => {
        return (
          <Result
            id={id}
            isLive={isLive}
            name={name}
            thumbnailUrl={thumbnailUrl}
            updatedAt={updatedAt}
            user={user}
            key={id}
          />
        );
      })}
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px]" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, idx) => (
          <ResultSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};
