import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '500', '700'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 transition hover:opacity-75">
        <div className="rounded-full bg-white p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/stampy.svg" alt="brawl-tv" height={32} width={32} />
        </div>
        <div className={cn('hidden lg:block', font.className)}>
          <p className="text-lg font-semibold text-white">Brawl TV</p>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
      </div>
    </Link>
  );
};
