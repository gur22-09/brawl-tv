'use client'

import { Button } from "@/components/ui/button";
import { onUnBlock } from "@/server-actions/block";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) => toast.success(`${data.blocked.username} unblocked`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <Button disabled={isPending} onClick={onClick} variant="link" size="sm">
      Unblock
    </Button>
  );
};