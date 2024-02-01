'use client';

import { useChatSidebar } from '@/store/use-chat-sidebar';
import {
  MessageSquare,
  Users,
} from 'lucide-react';
import { Hint } from '../hint';
import { Button } from '../button';
import { ChatVariant } from '@/lib/types';

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const updated = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(updated);
  };

  const lable = isChat ? 'Community' : 'Chat';

  return (
    <Hint label={lable} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto bg-transparent p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
