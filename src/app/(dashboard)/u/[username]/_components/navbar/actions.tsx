import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <LogOut className="mr-2 h-5 w-5" />
        </Link>
      </Button>
      <UserButton afterSignOutUrl='/'/>
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
