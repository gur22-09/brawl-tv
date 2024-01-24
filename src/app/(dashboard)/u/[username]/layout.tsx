import { getSelfByUsername } from '@/lib/auth-service';
import { redirect } from 'next/navigation';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { Container } from './_components/container';

interface Props {
  params: { username: string };
  children: React.ReactNode;
}

const CreatorLayout = async ({ params, children }: Props) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <main className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default CreatorLayout;
