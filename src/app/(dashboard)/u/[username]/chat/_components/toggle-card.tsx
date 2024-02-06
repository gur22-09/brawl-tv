'use client';

import { Switch } from '@/components/ui/switch';
import { Stream } from '@prisma/client';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { updateStream } from '@/server-actions/stream';
import { Skeleton } from '@/components/ui/skeleton';

type fields = Pick<
  Stream,
  'isChatDelayed' | 'isChatEnabled' | 'isChatFollowersOnly'
>;

interface ToggleCardProps {
  label: string;
  field: keyof fields;
  value: boolean;
}

export const ToggleCard = ({ label, value, field }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success('Chat Settings updated!');
        })
        .catch(() => {
          toast.error('Error updating chat settings!');
        });
    });
  };

  return (
    <div className="rounded-xl bg-slate-200 p-6">
      <div className="flex items-center justify-between">
        <p className="shrink-0 font-semibold">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className='rounded-xl p-10 w-full bg-slate-200' />
  )
}