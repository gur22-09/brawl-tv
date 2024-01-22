'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';
import { useLayoutEffect } from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
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
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col border-r bg-background transition-[width]',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  );
};
