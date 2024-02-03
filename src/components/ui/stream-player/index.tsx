'use client';

import { useViewerToken } from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { Video, VideoSkeleton } from './video';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { cn } from '@/lib/utils';
import { Chat, ChatSkeleton } from './chat';
import { ChatToggle } from './chat/chat-toggle';
import { Header, HeaderSkeleton } from './header';
import { StreamInfo } from './stream-info';

interface StreamPlayerProps {
  hostImageUrl: string;
  streamName: string;
  hostName: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  hostName,
  hostIdentity,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  isFollowing,
  streamName,
  hostImageUrl,
  thumbnailUrl,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(hostIdentity);
  const collapsed = useChatSidebar((state) => state.collapsed);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL;

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden bg-white/20 lg:block">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={hostName} hostId={hostIdentity} />
          <Header
            hostName={hostName}
            hostId={hostIdentity}
            viewerIdentity={identity}
            hostImageUrl={hostImageUrl}
            isFollowing={isFollowing}
            streamName={streamName}
          />
          <StreamInfo
            streamName={streamName}
            thumbnailUrl={thumbnailUrl || ''}
            hostId={hostIdentity}
            viewerId={identity}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={hostName}
            hostIdentity={hostIdentity}
            isFollowing={isFollowing}
            isEnabled={isChatEnabled}
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
