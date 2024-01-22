'use client';

import { useSideBar } from '@/store/use-sidebar';
import { User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './user-item';

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const collapsed = useSideBar((state) => state.collapsed);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
            key={user.id}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2 pt-4">
      {[...Array(4)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};
