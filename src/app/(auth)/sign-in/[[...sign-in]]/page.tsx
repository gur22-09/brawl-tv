import { SignIn } from '@clerk/nextjs';
import { Logo } from '../../_components/logo';

export default async function Page() {
  return (
    <>
      <Logo />
      <SignIn />
    </>
  );
}
