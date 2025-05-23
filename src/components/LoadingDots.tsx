
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex space-x-1 items-center", className)}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-dot-1"></div>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-dot-2"></div>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse-dot-3"></div>
    </div>
  );
};

export default LoadingDots;
