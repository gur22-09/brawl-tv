import { Check } from 'lucide-react';

export const VerifiedMark = () => {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 p-0.5">
      <Check className='h-[10px] w-[10px] text-white stroke-[4px]'/>
    </div>
  );
};
