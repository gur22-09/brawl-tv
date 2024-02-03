'use client';

import { UserAvatar, UserAvatorSkeleton } from '@/components/user-avatar';
import { VerifiedMark } from '../verified-mark';
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { UserIcon } from 'lucide-react';
import { Actions, ActionsSkeleton } from './actions';
import { Skeleton } from '../skeleton';

interface HeaderProps {
  hostImageUrl: string;
  hostName: string;
  hostId: string;
  viewerIdentity: string;
  isFollowing: boolean;
  streamName: string;
}

export const Header = ({
  hostImageUrl,
  hostId,
  hostName,
  viewerIdentity,
  isFollowing,
  streamName,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostId);

  const isLive = !!participant;
  const count = participants.length - 1;
  const hostAsViewer = `host-${hostId}`;
  const isHost = hostAsViewer === viewerIdentity;

  return (
    <div className="flex flex-col items-start justify-between gap-y-2 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={hostImageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <p className="text-lg font-semibold">{streamName}</p>
          <div className="flex items-center gap-x-2">
            <h2 className="text-sm font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          {isLive ? (
            <div className="flex items-center gap-x-1 text-xs font-semibold text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {count} {count === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      {!isHost && <Actions isFollowing={isFollowing} hostId={hostId} />}
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-y-2 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-2">
        <UserAvatorSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
