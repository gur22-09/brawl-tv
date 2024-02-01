'use client';

import { Maximize, Minimize } from 'lucide-react';
import { Hint } from '../hint';

interface FullScreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({
  isFullscreen,
  onToggle,
}: FullScreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint lable={label} asChild>
        <button
          onClick={onToggle}
          className="text-white-p-1.5 rounded-lg hover:bg-white/10"
        >
            <Icon />
        </button>
      </Hint>
    </div>
  );
};
