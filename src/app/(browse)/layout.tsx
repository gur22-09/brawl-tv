import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import SideBar from './_components/sidebar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default HomeLayout;

