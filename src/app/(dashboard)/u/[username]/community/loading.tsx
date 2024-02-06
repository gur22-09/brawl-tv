import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="w-full p-4">
      <Skeleton className="h-12 w-[200px] bg-slate-200 mb-2" />
      <div className='flex justify-between gap-x-1'>
        <Skeleton className="h-12 w-[200px] bg-slate-200" />
        <Skeleton className="h-12 w-[200px] bg-slate-200" />
        <Skeleton className="h-12 w-[200px] bg-slate-200" />
      </div>
    </div>
  );
};

export default Loading;
