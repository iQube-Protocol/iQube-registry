
import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  label?: string;
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  scoreType?: 'risk' | 'sensitivity' | 'accuracy' | 'verifiability' | 'trust' | 'reliability';
}

const getDotsFromScore = (value: number, max: number = 10): number => {
  const normalizedScore = Math.min(Math.max(value, 0), max);
  return Math.ceil(normalizedScore / 2);
};

const getColorByScoreType = (value: number, scoreType: string): string => {
  if (scoreType === 'risk' || scoreType === 'sensitivity') {
    // Higher scores are more concerning: Green (1-4), Yellow (5-7), Red (8-10)
    if (value <= 4) return 'bg-green-500';
    if (value <= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  } else {
    // Higher scores are better: Red (1-3), Yellow (4-6), Green (7-10)
    if (value <= 3) return 'bg-red-500';
    if (value <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  }
};

export const ScoreIndicator = ({ 
  label = '', 
  value, 
  max = 10, 
  size = 'md',
  showValue = true,
  showLabel = true,
  scoreType = 'accuracy'
}: ScoreIndicatorProps) => {
  const dots = getDotsFromScore(value, max);
  const colorClass = getColorByScoreType(value, scoreType);
  
  const dotSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm'
  };

  return (
    <div className="space-y-1">
      {showLabel && label && (
        <div className="flex items-center justify-between">
          <span className={cn(
            "font-medium text-slate-700",
            textSizeClasses[size]
          )}>
            {label}
          </span>
          {showValue && (
            <span className={cn(
              "font-semibold text-slate-600",
              textSizeClasses[size]
            )}>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((dotIndex) => (
          <div
            key={dotIndex}
            className={cn(
              "rounded-full transition-all duration-300",
              dotSizeClasses[size],
              dotIndex <= dots
                ? colorClass
                : "bg-slate-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};
