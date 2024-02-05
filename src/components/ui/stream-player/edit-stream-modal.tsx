'use client'

import { useRef, useState, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UploadDropzone } from '@/lib/uploadthing';
import { updateStream } from '@/server-actions/stream';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';

import { toast } from 'sonner';
import { Pencil, Trash } from 'lucide-react';
import { Hint } from '../hint';
import Image from 'next/image';

interface EditStreamModalProps {
  streamName: string;
  thumbnailUrl: string | null;
}

export const EditStreamModal = ({
  streamName,
  thumbnailUrl,
}: EditStreamModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);  
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setname] = useState(streamName);
  const [thumbnail, setThumbnail] = useState(thumbnailUrl);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({
        name,
      })
        .then(() => {
          toast.success('Stream Updated!');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });

    closeRef.current?.click();
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed!');
          setThumbnail('');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          <div className="h-auto w-auto rounded-md bg-primary p-2">
            <Pencil className="h-5 w-5 text-slate-50" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSumbit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              onChange={onChangeName}
              placeholder="Stream Name"
              value={name}
              disabled={pending}
              className="focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnail ? (
              <div className="relative aspect-video overflow-visible rounded-xl border border-white/10">
                <div className="absolute right-0 top-1 z-[2]">
                  <Hint label="Remove" asChild side="left">
                    <Button
                      type="button"
                      disabled={pending}
                      className="h-auto p-1.5"
                      onClick={onRemoveThumbnail}
                    >
                      <Trash className="h-4 w-4" type="button" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  className="object-cover"
                  fill
                />
              </div>
            ) : (
              <div className="rounded-xl">
                <UploadDropzone
                  endpoint="uploadThumbnail"
                  appearance={{
                    label: {
                      color: '#000',
                    },
                    allowedContent: {
                      color: '#000',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnail(res[0].url);
                    router.refresh();
                    closeRef.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
