'use client'

import Image from 'next/image';
import { OfflineBadge } from '../offline-badge';

interface OfflineProps {
  username: string;
}

export const Offline = ({ username }: OfflineProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        className="block select-none md:hidden"
        src="/sandy.png"
        priority
        width={150}
        height={150}
        alt="offline"
      />
      <Image
        className="hidden select-none md:block"
        src="/sandy.png"
        priority
        width={250}
        height={250}
        alt="offline"
      />
      <div className="hidden items-center gap-x-1 sm:flex">
        <p className="text-primary">{username} is</p>
        <OfflineBadge />
      </div>
    </div>
  );
};
