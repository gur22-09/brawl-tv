'use client';
import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';
import { ToggleSkeleton } from './toggle';
import { RecommendedSkeleton } from './recommended';
import { useIsClient } from '@/hooks/useIsClient';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const collapsed = useSideBar((state) => state.collapsed);

  

  if (!isClient)
    return (
      <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r bg-background transition-[width] lg:w-60">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full  w-60 flex-col border-r  bg-background transition-none ',
        collapsed && 'w-[70px] transition-[width] ease-linear',
      )}
    >
      {children}
    </aside>
  );
};
