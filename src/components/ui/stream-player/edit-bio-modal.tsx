import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { useRef, useState, useTransition } from 'react';
import { updateUser } from '@/server-actions/user';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';

interface EditBioModalProps {
  bio: string;
}

export const EditBioModal = ({ bio }: EditBioModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(bio);

  const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then((user) => {
          toast.success(`${user.username} bio updated!`);
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error('Failed to update bio!');
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
          <DialogTitle>Edit Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSumbit} className="space-y-4">
          <Textarea
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add your bio"
            value={value}
            disabled={pending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose>
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
