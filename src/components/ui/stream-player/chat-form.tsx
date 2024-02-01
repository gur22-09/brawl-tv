'use client';

import { clean, cn, wait } from '@/lib/utils';
import { Input } from '../input';
import { Button } from '../button';
import { FormEvent, useState } from 'react';
import { Skeleton } from '../skeleton';
import { ChatInfo } from './chat-info';
import DOMPurify from 'dompurify';

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isHidden: boolean;
}
export const ChatForm = ({
  isFollowersOnly,
  isFollowing,
  value,
  onSubmit,
  onChange,
  isDelayed,
  isHidden,
}: ChatFormProps) => {
  const [isNotDelayed, setIsNotDelayed] = useState(false);

  if (isHidden) {
    return null;
  }

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

  const isDisabled = isNotDelayed || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDelayed) return;

    if (isDelayed && !isNotDelayed) {
      setIsNotDelayed(true);
      wait(3000).then(() => {
        setIsNotDelayed(false);
        onSubmit();
      });
    } else {
      onSubmit();
    }
  };

  return (
    <div className="bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-4 p-3"
      >
        <div className="w-full">
          <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
          <Input
            onChange={(e) => {
              onChange(clean(e.target.value));
            }}
            disabled={isDisabled}
            placeholder="Send a message"
            className={cn(
              'border-white/10',
              isFollowersOnly && 'rounded-t-none border-t-0',
            )}
            type="text"
            value={value}
          />
        </div>
        <div className="ml-auto">
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={isDisabled}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
