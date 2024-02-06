import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <Skeleton className="mb-2 min-h-[200px] min-w-[200px] rounded-full bg-slate-200" />
      <Skeleton className="h-[24rem] w-[24rem] bg-slate-200" />
    </div>
  );
}
