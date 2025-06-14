
import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  label: string;
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500'
};

const getColorByScore = (value: number, max: number = 10): keyof typeof colorClasses => {
  const percentage = (value / max) * 100;
  if (percentage >= 80) return 'green';
  if (percentage >= 60) return 'blue';
  if (percentage >= 40) return 'yellow';
  return 'red';
};

export const ScoreIndicator = ({ 
  label, 
  value, 
  max = 10, 
  size = 'md',
  showValue = true,
  showLabel = true,
  color 
}: ScoreIndicatorProps) => {
  const percentage = (value / max) * 100;
  const colorClass = color ? colorClasses[color] : colorClasses[getColorByScore(value, max)];
  
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={cn(
            "font-medium text-slate-700",
            textSizeClasses[size]
          )}>
            {label}
          </span>
          {showValue && (
            <span className={cn(
              "font-semibold",
              textSizeClasses[size]
            )}>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn(
        "w-full bg-slate-200 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div 
          className={cn(colorClass, "transition-all duration-500 ease-out", sizeClasses[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
