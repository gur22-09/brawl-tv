import Link from 'next/link';
import { User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Thumbnail, ThumbnailSkeleton } from '@/components/ui/thumbnail';
import { VerifiedMark } from '@/components/ui/verified-mark';

interface ResultProps {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  updatedAt: Date;
  user: User;
}

export const Result = ({
  id,
  name,
  thumbnailUrl,
  isLive,
  updatedAt,
  user,
}: ResultProps) => {
  return (
    <Link href={`/${user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={thumbnailUrl}
            fallback={user.imageUrl}
            isLive={isLive}
            username={user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="cursor-pointer text-lg font-bold hover:text-blue-500">
              {user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultSkeleton = () => {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-slate-200" />
        <Skeleton className="h-3 w-24 bg-slate-200" />
        <Skeleton className="h-3 w-12 bg-slate-200" />
      </div>
    </div>
  );
};
