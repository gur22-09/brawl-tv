import { ChatVariant } from '@/lib/types';
import { create } from 'zustand';

interface useChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<useChatSidebarStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
  onChangeVariant: (variant) => set(() => ({ variant })),
}));
