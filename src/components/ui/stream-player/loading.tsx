import { Loader } from 'lucide-react';

interface LoadingProps {
  label: string;
}

export const Loading = ({ label }: LoadingProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};
