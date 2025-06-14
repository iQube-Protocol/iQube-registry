
import { IQube } from '@/types/iQube';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { formatPrice } from '@/utils/priceUtils';
import { IQubeBadges } from './IQubeBadges';
import { IQubeActionButtons } from './IQubeActionButtons';

interface IQubeGridCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart?: (iQube: IQube) => void;
}

export const IQubeGridCard = ({
  iQube,
  onView,
  onEdit,
  onDelete,
  onAddToCart
}: IQubeGridCardProps) => {
  const priceDisplay = formatPrice(iQube.price);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-slate-200 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-slate-900 mb-1 line-clamp-2 min-h-[3.5rem]">
              {iQube.iQubeName}
            </h3>
            <p className="text-sm text-slate-600 mb-2 h-5">
              by {iQube.iQubeCreator}
            </p>
            <IQubeBadges iQube={iQube} />
          </div>
          <div className="text-right flex-shrink-0 min-w-0 max-w-[120px]">
            <p className="font-bold text-slate-900 text-base leading-tight break-words">
              {priceDisplay.primary}
            </p>
            <p className="text-slate-500 text-sm leading-tight break-words">
              {priceDisplay.secondary}
            </p>
            <p className="text-xs text-slate-400 leading-tight break-words">
              per {iQube.priceTo.toLowerCase()}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-slate-600 line-clamp-2 flex-1">
          {iQube.iQubeDescription}
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <ScoreIndicator label="Risk" value={iQube.riskScore} size="sm" scoreType="risk" />
          <ScoreIndicator label="Accuracy" value={iQube.accuracyScore} size="sm" scoreType="accuracy" />
          <ScoreIndicator label="Verifiability" value={iQube.verifiabilityScore} size="sm" scoreType="verifiability" />
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
          <IQubeActionButtons
            iQube={iQube}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCart={onAddToCart}
          />
          <span className="text-xs text-slate-400">
            {new Date(iQube.transactionDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
