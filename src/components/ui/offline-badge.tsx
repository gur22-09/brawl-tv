import { cn } from '@/lib/utils';

interface OfflineBadgeProps {
  className?: string;
}

export const OfflineBadge = ({ className }: OfflineBadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-md border border-background bg-primary p-0.5 px-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-white',
        className,
      )}
    >
      OFFLINE
    </div>
  );
};
