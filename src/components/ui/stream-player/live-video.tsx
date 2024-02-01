'use client';

import { useEffect, useRef, useState } from 'react';
import { Participant, Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { FullScreenControl } from './fullscreen-control';
import { VolumeControl } from './volume-control';

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevVolume = useRef<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    const handleFullScreenChange = () => {
      const isCurrentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    node?.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      node?.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [wrapperRef]);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    // set prev volume before muting
    if (volume > 0) {
      prevVolume.current = volume;
    }

    const isMuted = volume === 0;

    setVolume(isMuted ? prevVolume.current : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current?.requestFullscreen) {
      wrapperRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative flex h-full" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
