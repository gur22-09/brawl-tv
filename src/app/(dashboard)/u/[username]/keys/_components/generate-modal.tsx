'use client';

import { useState, useTransition } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { createIngress } from '@/server-actions/ingress';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const GenerateModal = () => {
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = () => {
    startTransition(() => {
      const input = parseInt(ingressType);
      createIngress(input)
        .then(() => {
          toast.success('Ingress created successfully');
          setOpen(false);
        })
        .catch(() => toast.error('Failed to create Ingress'));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate Keys</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Keys</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(val) => setIngressType(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={WHIP}>WHIP</SelectItem>
            <SelectItem value={RTMP}>RTMP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" color="rgb(239 68 68)" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose>
            <Button onClick={() => setOpen(false)} asChild variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
