'use client';

import { useAuth } from '@clerk/nextjs';
import { Button } from '../button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { onFollow, onUnFollow } from '@/server-actions/follow';
import { toast } from 'sonner';
import { Skeleton } from '../skeleton';

interface ActionsProps {
  hostId: string;
  isFollowing: boolean;
}

export const Actions = ({ hostId, isFollowing }: ActionsProps) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostId)
        .then((data) => {
          toast.success(`Following ${data.following.username}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(hostId)
        .then((data) => {
          toast.success(`Unfollowed ${data.following.username}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={pending}
      onClick={toggleFollow}
      variant="outline"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn('mr-2 h-4 w-4', isFollowing ? 'fill-black' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
