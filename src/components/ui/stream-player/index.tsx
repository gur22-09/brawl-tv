'use client';

import { useViewerToken } from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { User, Stream } from '@prisma/client';
import { Video } from './video';

interface StreamPlayerProps {
  user: User & {
    stream: Stream | null;
  };
  isFollowing: boolean;
}

export const StreamPlayer = ({ user }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>unable to watch the stream</div>;
  }

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL;
  
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostId={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};
