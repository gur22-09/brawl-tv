import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HintProps {
  lable: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const Hint = ({ lable, children, asChild, side, align }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="bg-white text-black"
          side={side}
          align={align}
        >
          <p className="font-semibold">{lable}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
