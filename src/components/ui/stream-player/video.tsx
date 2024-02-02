'use client';

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { Offline } from './offline';
import { Loading } from './loading';
import { LiveVideo } from './live-video';
import { Skeleton } from '../skeleton';

interface VideoProps {
  hostName: string;
  hostId: string;
}

export const Video = ({ hostName, hostId }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostId);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    // we are offline
    content = <Offline username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    // loading
    content = <Loading label={connectionState} />;
  } else {
    // we are live
    content = <LiveVideo participant={participant} />;
  }

  return <div className="group relative aspect-video border-b">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="rounded-non h-full w-full bg-slate-200" />
    </div>
  );
};
