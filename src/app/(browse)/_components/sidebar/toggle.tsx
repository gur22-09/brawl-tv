'use client';

import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import { useSideBar } from '@/store/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSideBar((state) => state);
  const label = collapsed ? 'Expand' : 'Collapse';
  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint asChild lable={label} side="right">
            <Button className="h-auto p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          {/* <p className="font-semibold text-primary">For you</p> */}
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
