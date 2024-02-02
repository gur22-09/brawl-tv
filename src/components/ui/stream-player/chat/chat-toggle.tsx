'use client';

import { useChatSidebar } from '@/store/use-chat-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '../../hint';
import { Button } from '../../button';

export const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const lable = collapsed ? 'Expand' : 'Collapse';

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
