import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

interface ToggleProps {
  isCollapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  label: string;
  preText: string;
}

export const Toggle = ({
  isCollapsed,
  onExpand,
  onCollapse,
  label,
  preText
}: ToggleProps) => {
  return (
    <>
      {isCollapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint asChild lable={label} side="right">
            <Button className="h-auto p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!isCollapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">{preText}</p>
          <Hint lable={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};