'use client';

import { Button } from '@/components/ui/button';
import { onFollow, onUnFollow } from '@/server-actions/follow';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are following ${data.following.username}`);
        })
        .catch(() => toast.error('Something went wrong'));
    });
  }

  function handleUnFollow() {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) => {
          toast.success(`You un-followed ${data.following.username}`);
        })
        .catch(() => toast.error('Something went wrong'));
    });
  }

  function onClick() {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  }

  return (
    <Button disabled={isPending} onClick={onClick} variant="outline">
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
