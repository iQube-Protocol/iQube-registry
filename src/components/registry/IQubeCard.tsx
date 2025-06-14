
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
  viewMode?: 'grid' | 'list';
}

const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  ToolQube: 'bg-purple-100 text-purple-800',
  ModelQube: 'bg-orange-100 text-orange-800',
  AigentQube: 'bg-red-100 text-red-800'
};

const typeAccentColors = {
  DataQube: 'border-l-blue-500',
  ContentQube: 'border-l-green-500',
  ToolQube: 'border-l-purple-500',
  ModelQube: 'border-l-orange-500',
  AigentQube: 'border-l-red-500'
};

export const IQubeCard = ({ iQube, onView, onEdit, onDelete, viewMode = 'grid' }: IQubeCardProps) => {
  if (viewMode === 'list') {
    return (
      <div className={cn(
        "bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200 border-l-4",
        typeAccentColors[iQube.iQubeType]
      )}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 grid grid-cols-10 gap-4 items-center">
              <div className="col-span-3">
                <h3 className="font-semibold text-slate-900 mb-1">
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
                <Badge variant="outline" className="text-xs w-fit">
                  {iQube.ownerType}
                </Badge>
              </div>
              
              <div className="col-span-1 grid grid-cols-2 gap-2">
                <ScoreIndicator 
                  value={iQube.riskScore} 
                  size="xs"
                  showLabel={false}
                />
                <ScoreIndicator 
                  value={iQube.accuracyScore} 
                  size="xs"
                  showLabel={false}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-4">
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
          </div>
        </div>
      </div>
    );
  }

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
