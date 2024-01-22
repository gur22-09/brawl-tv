import { Suspense } from 'react';
import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import SideBar, { SideBarSkeleton } from './_components/sidebar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default HomeLayout;
