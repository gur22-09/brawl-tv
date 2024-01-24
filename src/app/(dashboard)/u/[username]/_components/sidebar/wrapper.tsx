'use client';

import { cn } from '@/lib/utils';
import { useDashboardSideBar } from '@/store/use-dashboard-sidebar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useDashboardSideBar((state) => state.collapsed);
  console.log({
    collapsed,
  });
  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full flex-col border-r bg-background  transition-none w-60',
        collapsed && 'transition-[width] ease-linear w-[70px]',
      )}
    >
      {children}
    </aside>
  );
};
