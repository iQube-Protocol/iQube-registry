import { IQube } from '@/types/iQube';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Eye, Edit, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/priceUtils';

interface IQubeTableViewProps {
  iQubes: IQube[];
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
}

const typeColors = {
  DataQube: 'bg-blue-50 border-blue-200 text-blue-800',
  ContentQube: 'bg-green-50 border-green-200 text-green-800',
  ToolQube: 'bg-purple-50 border-purple-200 text-purple-800',
  ModelQube: 'bg-orange-50 border-orange-200 text-orange-800',
  AigentQube: 'bg-red-50 border-red-200 text-red-800'
};

const typeRowColors = {
  DataQube: 'hover:bg-blue-50',
  ContentQube: 'hover:bg-green-50',
  ToolQube: 'hover:bg-purple-50',
  ModelQube: 'hover:bg-orange-50',
  AigentQube: 'hover:bg-red-50'
};

export const IQubeTableView = ({ iQubes, onView, onEdit, onDelete }: IQubeTableViewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-medium text-slate-700">iQube Name</th>
              <th className="text-left p-4 font-medium text-slate-700">Creator</th>
              <th className="text-left p-4 font-medium text-slate-700">Description</th>
              <th className="text-left p-4 font-medium text-slate-700">Owner Type</th>
              <th className="text-left p-4 font-medium text-slate-700">iQube Type</th>
              <th className="text-left p-4 font-medium text-slate-700">Owner ID</th>
              <th className="text-left p-4 font-medium text-slate-700">Date</th>
              <th className="text-left p-4 font-medium text-slate-700">Sensitivity</th>
              <th className="text-left p-4 font-medium text-slate-700">Verifiability</th>
              <th className="text-left p-4 font-medium text-slate-700">Accuracy</th>
              <th className="text-left p-4 font-medium text-slate-700">Risk</th>
              <th className="text-left p-4 font-medium text-slate-700">Biz Model</th>
              <th className="text-left p-4 font-medium text-slate-700">Price</th>
              <th className="text-left p-4 font-medium text-slate-700">Price To</th>
              <th className="text-left p-4 font-medium text-slate-700">Duration</th>
              <th className="text-left p-4 font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {iQubes.map((iqube) => {
              const priceDisplay = formatPrice(iqube.price);
              
              return (
                <tr 
                  key={iqube.id} 
                  className={cn(
                    "border-b border-slate-100 transition-colors",
                    typeRowColors[iqube.iQubeType]
                  )}
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{iqube.iQubeName}</div>
                  </td>
                  <td className="p-4 text-slate-600">{iqube.iQubeCreator}</td>
                  <td className="p-4 max-w-xs">
                    <div className="text-slate-600 text-sm truncate" title={iqube.iQubeDescription}>
                      {iqube.iQubeDescription}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {iqube.ownerType}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={cn('text-xs', typeColors[iqube.iQubeType])}>
                      {iqube.iQubeType}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {iqube.ownerIdentifiability}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    {new Date(iqube.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="w-16">
                      <ScoreIndicator value={iqube.sensitivityScore} size="xs" showLabel={false} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-16">
                      <ScoreIndicator value={iqube.verifiabilityScore} size="xs" showLabel={false} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-16">
                      <ScoreIndicator value={iqube.accuracyScore} size="xs" showLabel={false} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-16">
                      <ScoreIndicator value={iqube.riskScore} size="xs" showLabel={false} />
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {iqube.businessModel}
                    </Badge>
                  </td>
                  <td className="p-4 font-medium text-slate-900">
                    <div className="text-right">
                      <div className="font-medium text-slate-900">
                        {priceDisplay.primary}
                      </div>
                      <div className="text-xs text-slate-500">
                        {priceDisplay.secondary}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{iqube.priceTo}</td>
                  <td className="p-4 text-slate-600 text-sm">{iqube.durationOfRights}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(iqube)}
                        className="text-slate-600 hover:text-blue-600 h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(iqube)}
                        className="text-slate-600 hover:text-green-600 h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(iqube.id)}
                        className="text-slate-600 hover:text-red-600 h-8 w-8 p-0"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
