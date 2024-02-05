'use client';

import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Hint } from '../../hint';
import { cn, stringToColor } from '@/lib/utils';
import { Button } from '../../button';
import { onBlock } from '@/server-actions/block';

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [pending, startTransition] = useTransition();
  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const onClick = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`Blocked ${participantName}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  return (
    <div
      className={cn(
        'group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-slate-100',
        pending && 'pointer-events-none opacity-50',
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={pending}
            onClick={onClick}
            className="h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
