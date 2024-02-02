'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { ConnectionState } from 'livekit-client';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatVariant } from '@/lib/types';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatList, ChatListSkeleton } from './chat-list';
import { CommunityChat } from './community-chat';

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isEnabled: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowersOnly,
  isFollowing,
  isEnabled,
  isDelayed,
}: ChatProps) => {
  const [value, setValue] = useState('');
  const { chatMessages, send } = useChat();
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => ({
    variant: state.variant,
    onExpand: state.onExpand,
  }));

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isEnabled || !isOnline;

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const messages = useMemo(
    () => chatMessages.sort((a, b) => b.timestamp - a.timestamp),
    [chatMessages],
  );

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col border-b border-l bg-background pt-0">
      <ChatHeader />
      {variant === ChatVariant.COMMUNITY && (
        <>
          <CommunityChat
            hostName={hostName}
            viewerName={viewerName}
            isHidden={isHidden}
          />
        </>
      )}
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList isHidden={isHidden} messages={messages} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            isHidden={isHidden}
            onChange={onChange}
            isFollowersOnly={isFollowersOnly}
            isDelayed={isDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2'>
       <ChatHeaderSkeleton />
       <ChatListSkeleton />
       <ChatFormSkeleton />
    </div>
  );
}
