'use client';

import { useParticipants } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { Input } from '../../input';
import { ScrollArea } from '../../scroll-area';
import { CommunityItem } from './community-item';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';


interface CommunityChatProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const CommunityChat = ({
  hostName,
  viewerName,
  isHidden,
}: CommunityChatProps) => {
  const [value, setValue] = useState('');
  const participants = useParticipants();

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    );

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(value.toLowerCase());
    });
  }, [participants, value]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-zinc/10"
      />
      <ScrollArea className="mt-4 gap-y-2">
        <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
          No results
        </p>
        {filteredParticipants.map((p) => (
          <CommunityItem
            key={p.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={p.name}
            participantIdentity={p.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
