import Image from 'next/image';
import { UserAvatar } from '../user-avatar';
import { LiveBadge } from './live-badge';
import { Skeleton } from './skeleton';

interface ThumbnailProps {
  src: string | null;
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
      <div className="absolute inset-0 flex items-center rounded-md bg-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />
      {src ? (
        <Image
          src={src}
          fill
          alt="Thumbnail"
          className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:shadow-2xl"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:shadow-2xl">
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
        <div className="absolute bottom-2 right-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
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
