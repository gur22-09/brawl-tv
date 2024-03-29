import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Log In
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};

export const ActionsSkeleton = () => {
  return (
    <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
      <Skeleton className="min-h-[36px] w-[125px]" />
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
    </div>
  );
};

export default Actions;
