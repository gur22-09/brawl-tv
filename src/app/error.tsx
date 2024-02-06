'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-4xl">Oops! Something went wrong</h1>
      <p className="text-center">
        Go back or click the button below to go to the Home page.
      </p>
      <Button asChild>
        <Link href="/">GO TO HOME</Link>
      </Button>
      <div className="absolute bottom-0 right-0">
        <Image
          className="hidden lg:block"
          src="/mortis.webp"
          width={250}
          height={500}
          alt=""
        />
        <Image
          className="hidden sm:block lg:hidden"
          src="/mortis.webp"
          width={200}
          height={250}
          alt=""
        />
        <Image
          className="block sm:hidden"
          src="/mortis.webp"
          width={150}
          height={200}
          alt=""
        />
      </div>
    </div>
  );
};

export default ErrorPage;
