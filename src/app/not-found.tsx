import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-4xl">Oops! Page not found</h1>
      <p className="text-center">
        Sorry we cound&apos;t find what you were looking for <br />
        Go back or click the button below to go to the Home page.
      </p>
      <Button asChild>
        <Link href="/">GO TO HOME</Link>
      </Button>
      <div className="absolute bottom-0 right-0">
        <Image
          className="large hidden lg:block"
          src="/mortis.webp"
          width={250}
          height={400}
          alt=""
        />
        <Image
          className="medium hidden sm:block lg:hidden"
          src="/mortis.webp"
          width={200}
          height={250}
          alt=""
        />
        <Image
          className="small block sm:hidden"
          src="/mortis.webp"
          width={150}
          height={200}
          alt=""
        />
      </div>
    </div>
  );
};

export default NotFound;
