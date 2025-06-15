
import { IQube } from '@/types/iQube';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/priceUtils';
import { typeAccentColors } from '../constants/cardStyles';
import { IQubeBadges } from './IQubeBadges';
import { IQubeActionButtons } from './IQubeActionButtons';
import { IQubeInstanceBadge } from './IQubeInstanceBadge';

interface IQubeListCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart?: (iQube: IQube) => void;
  onViewInstances?: (templateId: string) => void;
}

export const IQubeListCard = ({
  iQube,
  onView,
  onEdit,
  onDelete,
  onAddToCart,
  onViewInstances
}: IQubeListCardProps) => {
  const priceDisplay = formatPrice(iQube.price);

  return (
    <div className={cn("bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200 border-l-4", typeAccentColors[iQube.iQubeType])}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3">
              <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                {iQube.iQubeName}
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                by {iQube.iQubeCreator}
              </p>
              <IQubeInstanceBadge iQube={iQube} onViewInstances={onViewInstances} />
            </div>
            
            <div className="col-span-4">
              <p className="text-sm text-slate-600 line-clamp-2">
                {iQube.iQubeDescription}
              </p>
            </div>
            
            <div className="col-span-2">
              <IQubeBadges iQube={iQube} layout="vertical" />
            </div>
            
            <div className="col-span-2 grid grid-cols-1 gap-2">
              <ScoreIndicator label="Risk" value={iQube.riskScore} size="xs" scoreType="risk" />
              <ScoreIndicator label="Accuracy" value={iQube.accuracyScore} size="xs" scoreType="accuracy" />
            </div>
            
            <div className="col-span-1 text-right">
              <div className="min-w-0">
                <p className="text-lg font-bold text-slate-900 truncate">
                  {priceDisplay.primary}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {priceDisplay.secondary}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  per {iQube.priceTo.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="ml-4">
            <IQubeActionButtons
              iQube={iQube}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
