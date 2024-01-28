'use client'

import { useState } from 'react';
import { Button } from './button';
import { CheckCheck, Copy } from 'lucide-react';
import { wait } from '@/lib/utils';

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setisCopied] = useState(false);

  const onCopy = () => {
    if (!value) {
      return;
    }

    setisCopied(true);
    navigator.clipboard.writeText(value);
    wait(1000).then(() => setisCopied(false));
  };

  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button onClick={onCopy} disabled={!value || isCopied}>
      <Icon className="h-4 w-4" />
    </Button>
  );
};
