import { Suspense } from 'react';
import Actions, { ActionsSkeleton } from './actions';
import { Logo } from './logo';
import Search from './search';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-[10] flex h-20 w-full items-center justify-between bg-zinc-950 px-2 shadow-sm lg:px-4">
      <Logo />
      <Search />
      <Suspense fallback={<ActionsSkeleton />}>
        <Actions />
      </Suspense>
    </nav>
  );
};
