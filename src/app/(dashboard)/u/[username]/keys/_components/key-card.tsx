'use client';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface KeyCardProps {
  value: string;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  const Icon = show ? Eye : EyeOff;

  return (
   <div className="rounded-xl bg-slate-200 p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">
          Stream Key
        </p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream key"
            />
            <CopyButton value={value} />
          </div>
          <Button
            onClick={() => setShow(!show)}
            size="sm"
            variant="link"
          >
            <Icon className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};
