'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { useSideBar } from '@/store/use-sidebar';




export const ToggleWrapper = () => {
  const { collapsed, onExpand, onCollapse } = useSideBar((state) => state);

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <Toggle
      isCollapsed={collapsed}
      onCollapse={onCollapse}
      onExpand={onExpand}
      label={label}
      preText="For you"
    />
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
