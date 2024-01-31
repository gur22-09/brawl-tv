'use client';

import { useSideBar } from '@/store/use-sidebar';
import { UserItem, UserItemSkeleton } from './user-item';
import { Follow, Stream, User } from '@prisma/client';

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: Stream | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const collapsed = useSideBar((state) => state.collapsed);

  if (!data.length) return null;
  console.log({
    data,
  });
  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => {
          return (
            <UserItem
              key={follow.following.id}
              username={follow.following.username}
              imageUrl={follow.following.imageUrl}
              isLive={follow.following.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};
