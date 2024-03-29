'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';
import { ReactNode, useLayoutEffect } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);

  const matches = useMediaQuery('(max-width: 1024px)');

  useLayoutEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);
  
  return (
    <div className={cn('flex-1', collapsed ? 'ml-[70px]' : 'lg:ml-60')}>
      {children}
    </div>
  );
};
