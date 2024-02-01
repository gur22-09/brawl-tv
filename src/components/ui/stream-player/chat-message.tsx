'use client';

import { stringToColor } from '@/lib/utils';
import { ReceivedChatMessage } from '@livekit/components-react';

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

const formattedTime = (timestamp: number) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(timestamp);

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || '');
  const timeStr = formattedTime(data.timestamp);
  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="text-sm text-zinc/40 select-none">{timeStr}</p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold select-none">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
        </p>
        <p className="break-all text-sm">{data.message}</p>
      </div>
    </div>
  );
};
