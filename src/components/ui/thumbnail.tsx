import Image from 'next/image';
import { UserAvatar } from '../user-avatar';
import { LiveBadge } from './live-badge';
import { Skeleton } from './skeleton';

interface ThumbnailProps {
  src: string;
  fallback: string;
  isLive: boolean;
  username: string;
}

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 flex items-center rounded-md bg-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
      {src ? (
        <Image
          src={src}
          fill
          alt="Thumbnail"
          className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <UserAvatar
            size="lg"
            showBadge
            username={username}
            imageUrl={fallback}
            isLive={isLive}
          />
        </div>
      )}
      {isLive && src && (
        <div className="absolute right-2 bottom-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group relative aspect-video rounded-xl">
      <Skeleton className="h-full w-full bg-slate-200" />
    </div>
  );
};
