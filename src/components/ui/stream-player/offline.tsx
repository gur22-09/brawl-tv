import Image from 'next/image';

interface OfflineProps {
  username: string;
}

export const Offline = ({ username }: OfflineProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image src="/sandy.png" priority width={250} height={250} alt="offline" />
      <p className="text-muted-foreground">
        {username} is offline.
      </p>
    </div>
  );
};
