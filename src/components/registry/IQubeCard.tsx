
import { IQube } from '@/types/iQube';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IQubeCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
}

const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  ToolQube: 'bg-purple-100 text-purple-800',
  ModelQube: 'bg-orange-100 text-orange-800',
  AigentQube: 'bg-red-100 text-red-800'
};

const getRiskColor = (score: number) => {
  if (score <= 3) return 'text-green-600';
  if (score <= 6) return 'text-yellow-600';
  return 'text-red-600';
};

export const IQubeCard = ({ iQube, onView, onEdit, onDelete }: IQubeCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">
              {iQube.iQubeName}
            </h3>
            <p className="text-sm text-slate-600 mb-2">
              by {iQube.iQubeCreator}
            </p>
            <div className="flex items-center space-x-2">
              <Badge className={cn('text-xs', typeColors[iQube.iQubeType])}>
                {iQube.iQubeType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {iQube.ownerType}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-900">
              ${iQube.price.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500">
              to {iQube.priceTo}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 line-clamp-2">
          {iQube.iQubeDescription}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <ScoreIndicator 
            label="Risk" 
            value={iQube.riskScore} 
            size="sm"
          />
          <ScoreIndicator 
            label="Accuracy" 
            value={iQube.accuracyScore} 
            size="sm"
          />
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(iQube)}
              className="text-slate-600 hover:text-blue-600"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(iQube)}
              className="text-slate-600 hover:text-green-600"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(iQube.id)}
              className="text-slate-600 hover:text-red-600"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(iQube.transactionDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
