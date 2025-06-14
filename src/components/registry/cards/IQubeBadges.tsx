
import { IQube } from '@/types/iQube';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { typeColors, businessModelColors } from '../constants/cardStyles';
import { iQubeTypeTooltips, businessModelTooltips } from '@/utils/tooltipContent';

interface IQubeBadgesProps {
  iQube: IQube;
  layout?: 'horizontal' | 'vertical';
}

export const IQubeBadges = ({ iQube, layout = 'horizontal' }: IQubeBadgesProps) => {
  const containerClass = layout === 'horizontal' 
    ? "flex items-center space-x-2" 
    : "flex flex-col space-y-1";

  return (
    <div className={containerClass}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={cn('text-xs cursor-help w-fit', typeColors[iQube.iQubeType])}>
            {iQube.iQubeType}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>{iQubeTypeTooltips[iQube.iQubeType]}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={cn('text-xs cursor-help w-fit', businessModelColors[iQube.businessModel])}>
            {iQube.businessModel}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>{businessModelTooltips[iQube.businessModel]}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
