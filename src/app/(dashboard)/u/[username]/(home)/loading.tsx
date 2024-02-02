import { StreamPlayerSkeleton } from '@/components/ui/stream-player';

const loading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default loading;
