import { Skeleton } from '@/components/ui/skeleton';
import { ToggleCardSkeleton } from './_components/toggle-card';

const ChatLoding = () => {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-19 w-[200px] bg-slate-200" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
};

export default ChatLoding;
