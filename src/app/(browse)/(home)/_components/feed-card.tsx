import { Skeleton } from '@/components/ui/skeleton';
import { Thumbnail, ThumbnailSkeleton } from '@/components/ui/thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { User } from '@prisma/client';
import Link from 'next/link';

interface FeedCardProps {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  updatedAt: Date;
  user: User;
}

export const FeedCard = ({
  id,
  name,
  thumbnailUrl,
  isLive,
  updatedAt,
  user,
}: FeedCardProps) => {
  
  return (
    <Link href={`/${user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={thumbnailUrl || ''}
          fallback={user.imageUrl}
          isLive={isLive}
          username={user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={isLive}
          />
          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold">
              {name}
            </p>
            <p className="text-muted-foreground">{user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const FeedCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32 bg-slate-200" />
          <Skeleton className="h-3 w-24 bg-slate-200"/>
        </div>
      </div>
    </div>
  );
};
