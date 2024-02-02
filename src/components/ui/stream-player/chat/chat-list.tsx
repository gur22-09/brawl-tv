'use client';

import { ReceivedChatMessage } from '@livekit/components-react';
import { ChatMessage } from './chat-message';
import { Skeleton } from '../../skeleton';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, isHidden }) => {
  if (messages.length === 0 || !messages || isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? 'Chat is Disabled' : 'Welcome to the chat room!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto p-3">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
    return (
        <div className='flex h-full items-center justify-center'>
         <Skeleton className='w-1/2 h-6 bg-slate-200' />
        </div>
    )
}