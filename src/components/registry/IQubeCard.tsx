import { IQube } from '@/types/iQube';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/priceUtils';
interface IQubeCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart?: (iQube: IQube) => void;
  viewMode?: 'grid' | 'list';
}
const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  ToolQube: 'bg-purple-100 text-purple-800',
  ModelQube: 'bg-orange-100 text-orange-800',
  AgentQube: 'bg-red-100 text-red-800'
};
const typeAccentColors = {
  DataQube: 'border-l-blue-500',
  ContentQube: 'border-l-green-500',
  ToolQube: 'border-l-purple-500',
  ModelQube: 'border-l-orange-500',
  AgentQube: 'border-l-red-500'
};
const businessModelColors = {
  Buy: 'bg-emerald-100 text-emerald-800',
  Sell: 'bg-orange-100 text-orange-800',
  Rent: 'bg-purple-100 text-purple-800',
  Lease: 'bg-indigo-100 text-indigo-800',
  Subscribe: 'bg-cyan-100 text-cyan-800',
  Stake: 'bg-yellow-100 text-yellow-800',
  License: 'bg-pink-100 text-pink-800',
  Donate: 'bg-gray-100 text-gray-800'
};
export const IQubeCard = ({
  iQube,
  onView,
  onEdit,
  onDelete,
  onAddToCart,
  viewMode = 'grid'
}: IQubeCardProps) => {
  const priceDisplay = formatPrice(iQube.price);
  if (viewMode === 'list') {
    return <div className={cn("bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200 border-l-4", typeAccentColors[iQube.iQubeType])}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                  {iQube.iQubeName}
                </h3>
                <p className="text-sm text-slate-600">
                  by {iQube.iQubeCreator}
                </p>
              </div>
              
              <div className="col-span-4">
                <p className="text-sm text-slate-600 line-clamp-2">
                  {iQube.iQubeDescription}
                </p>
              </div>
              
              <div className="col-span-2 flex flex-col space-y-1">
                <Badge className={cn('text-xs w-fit', typeColors[iQube.iQubeType])}>
                  {iQube.iQubeType}
                </Badge>
                <Badge className={cn('text-xs w-fit', businessModelColors[iQube.businessModel])}>
                  {iQube.businessModel}
                </Badge>
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
            
            <div className="flex items-center space-x-1 ml-4">
              <Button variant="ghost" size="sm" onClick={() => onView(iQube)} className="text-slate-600 hover:text-blue-600">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(iQube)} className="text-slate-600 hover:text-green-600">
                <Edit className="w-4 h-4" />
              </Button>
              {onAddToCart && <Button variant="ghost" size="sm" onClick={() => onAddToCart(iQube)} className="text-slate-600 hover:text-purple-600">
                  <ShoppingCart className="w-4 h-4" />
                </Button>}
              <Button variant="ghost" size="sm" onClick={() => onDelete(iQube.id)} className="text-slate-600 hover:text-red-600">
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }
  return <Card className="hover:shadow-lg transition-shadow duration-200 border-slate-200 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg text-slate-900 mb-1 line-clamp-2 min-h-[3.5rem]">
              {iQube.iQubeName}
            </h3>
            <p className="text-sm text-slate-600 mb-2 h-5">
              by {iQube.iQubeCreator}
            </p>
            <div className="flex items-center space-x-2">
              <Badge className={cn('text-xs', typeColors[iQube.iQubeType])}>
                {iQube.iQubeType}
              </Badge>
              <Badge className={cn('text-xs', businessModelColors[iQube.businessModel])}>
                {iQube.businessModel}
              </Badge>
            </div>
          </div>
          <div className="text-right flex-shrink-0 min-w-0">
            <p className="font-bold text-slate-900 truncate text-base">
              {priceDisplay.primary}
            </p>
            <p className="text-slate-500 truncate text-base">
              {priceDisplay.secondary}
            </p>
            <p className="text-xs text-slate-400 truncate">
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
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onView(iQube)} className="text-slate-600 hover:text-blue-600">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(iQube)} className="text-slate-600 hover:text-green-600">
              <Edit className="w-4 h-4" />
            </Button>
            {onAddToCart && <Button variant="ghost" size="sm" onClick={() => onAddToCart(iQube)} className="text-slate-600 hover:text-purple-600">
                <ShoppingCart className="w-4 h-4" />
              </Button>}
            <Button variant="ghost" size="sm" onClick={() => onDelete(iQube.id)} className="text-slate-600 hover:text-red-600">
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(iQube.transactionDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>;
};