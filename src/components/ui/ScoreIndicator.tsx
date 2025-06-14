
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ScoreIndicatorProps {
  label?: string;
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  scoreType?: 'risk' | 'sensitivity' | 'accuracy' | 'verifiability' | 'trust' | 'reliability';
  tooltip?: string;
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

const getScoreDescription = (scoreType: string, value: number): string => {
  switch (scoreType) {
    case 'risk':
      if (value <= 4) return 'Low Risk: Minimal impact if compromised, standard security measures sufficient';
      if (value <= 7) return 'Medium Risk: Moderate impact requiring enhanced security protocols';
      return 'High Risk: Severe impact requiring maximum security and restricted access';
    case 'accuracy':
      if (value <= 3) return 'Poor Accuracy: Incomplete, outdated, or potentially incorrect data';
      if (value <= 6) return 'Moderate Accuracy: Generally reliable with some limitations or gaps';
      return 'High Accuracy: Highly reliable, complete, and verified data';
    case 'verifiability':
      if (value <= 3) return 'Low Verifiability: Difficult to verify sources or authenticity';
      if (value <= 6) return 'Moderate Verifiability: Some verification possible with additional checks';
      return 'High Verifiability: Easily verifiable with clear provenance chain';
    case 'sensitivity':
      if (value <= 4) return 'Low Sensitivity: Public or anonymized data with minimal privacy concerns';
      if (value <= 7) return 'Medium Sensitivity: Semi-private data requiring controlled access';
      return 'High Sensitivity: Highly confidential data requiring maximum protection';
    case 'trust':
      return 'Trust Score: Overall data trustworthiness based on quality and verifiability';
    case 'reliability':
      return 'Reliability Index: Combines data quality metrics with inverse risk assessment';
    default:
      return '';
  }
};

export const ScoreIndicator = ({
  label = '',
  value,
  max = 10,
  size = 'md',
  showValue = true,
  showLabel = true,
  scoreType = 'accuracy',
  tooltip
}: ScoreIndicatorProps) => {
  const dots = getDotsFromScore(value, max);
  const colorClass = getColorByScoreType(value, scoreType);
  const description = tooltip || getScoreDescription(scoreType, value);

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

  const scoreContent = (
    <div className="space-y-1">
      {showLabel && label && (
        <div className="flex items-center justify-between">
          <span className={cn("font-medium text-slate-700", textSizeClasses[size])}>
            {label}
          </span>
          {showValue}
        </div>
      )}
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((dotIndex) => (
          <div
            key={dotIndex}
            className={cn(
              "rounded-full transition-all duration-300",
              dotSizeClasses[size],
              dotIndex <= dots ? colorClass : "bg-slate-200"
            )}
          />
        ))}
      </div>
    </div>
  );

  if (description) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            {scoreContent}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
            <span className="font-medium">Score: {value}/10</span>
            <br />
            {description}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return scoreContent;
};
