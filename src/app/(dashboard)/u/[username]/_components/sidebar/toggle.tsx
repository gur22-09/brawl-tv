'use client';

import { Toggle } from "@/components/ui/toggle";
import { useDashboardSideBar } from "@/store/use-dashboard-sidebar";

export const ToggleWrapper = () => {
  const { collapsed, onExpand, onCollapse } = useDashboardSideBar((state) => state); 
  
  const label = collapsed ? 'Expand' : 'Collapse';
  return (
    <Toggle
     label={label}
     isCollapsed={collapsed}
     onCollapse={onCollapse}
     onExpand={onExpand}
     preText="Dashboard"
     />
  )
};
