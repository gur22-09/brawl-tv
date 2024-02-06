import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-full p-6">
      <div className="mb-4 flex w-full flex-col justify-between gap-y-1">
        <Skeleton className="w-full rounded-xl bg-slate-200 p-10" />
        <Skeleton className="w-full rounded-xl bg-slate-200 p-10" />
        <Skeleton className="w-full rounded-xl bg-slate-200 p-10" />
      </div>
    </div>
  );
}
