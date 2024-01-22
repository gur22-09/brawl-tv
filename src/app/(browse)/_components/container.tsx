'use client';

import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collapsed } = useSideBar((state) => state);
  return (
    <main
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'lg:ml-60')}
    >
      {children}
    </main>
  );
};
