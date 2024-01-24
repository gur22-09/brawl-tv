'use client';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDashboardSideBar } from '@/store/use-dashboard-sidebar';
import { ReactNode, useEffect } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  const { collapsed, onCollapse, onExpand } = useDashboardSideBar(
    (state) => state,
  );
  const matches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return <div className={
    cn('flex-1', collapsed ? 'ml-[70px]' : 'lg:ml-60')
  }>{children}</div>;
};
