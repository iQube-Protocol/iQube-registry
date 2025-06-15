
import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Calendar, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/priceUtils';

interface IQubeDetailModalProps {
  iQube: IQube | null;
  open: boolean;
  onClose: () => void;
  onEdit: (iQube: IQube) => void;
}

const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  ToolQube: 'bg-purple-100 text-purple-800',
  ModelQube: 'bg-orange-100 text-orange-800',
  AgentQube: 'bg-red-100 text-red-800'
};

// Mock blakQube data structure - in real app this would come from the iQube object
const getBlakQubeData = (iQube: IQube) => [
  {
    key: 'Name',
    value: iQube.iQubeName,
    source: 'facebook'
  },
  {
    key: 'Creator',
    value: iQube.iQubeCreator,
    source: 'linkedin'
  },
  {
    key: 'Description',
    value: iQube.iQubeDescription,
    source: 'facebook'
  },
  {
    key: 'Schema Type',
    value: iQube.blakQubeSchema,
    source: 'linkedin'
  },
  {
    key: 'Business Model',
    value: iQube.businessModel,
    source: 'facebook'
  },
  {
    key: 'Owner Type',
    value: iQube.ownerType,
    source: 'linkedin'
  },
  {
    key: 'Identifiability',
    value: iQube.ownerIdentifiability,
    source: 'facebook'
  },
  {
    key: 'Rights Duration',
    value: iQube.durationOfRights,
    source: 'linkedin'
  },
  {
    key: 'Wallet Key',
    value: iQube.publicWalletKey || 'Not provided',
    source: 'facebook'
  }
];

const getSourceIcon = (source: string) => {
  switch (source) {
    case 'facebook':
      return '🔵'; // Blue circle representing Facebook
    case 'linkedin':
      return '🔷'; // Blue diamond representing LinkedIn
    default:
      return '⚫'; // Default black circle
  }
};

export const IQubeDetailModal = ({ iQube, open, onClose, onEdit }: IQubeDetailModalProps) => {
  if (!iQube) return null;

  const priceDisplay = formatPrice(iQube.price);
  const blakQubeData = getBlakQubeData(iQube);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
                {iQube.iQubeName}
              </DialogTitle>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={cn('text-sm', typeColors[iQube.iQubeType])}>
                  {iQube.iQubeType}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {iQube.ownerIdentifiability}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900">
                {priceDisplay.primary}
              </p>
              <p className="text-sm text-slate-600">
                {priceDisplay.secondary}
              </p>
              <p className="text-sm text-slate-600">
                {iQube.businessModel} per {iQube.priceTo.toLowerCase()}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* MetaQube Section - Condensed */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">MetaQube Profile</h3>
                  <p className="text-sm text-slate-600">Created by {iQube.iQubeCreator}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                {new Date(iQube.transactionDate).toLocaleDateString()}
              </div>
            </div>

            {/* Core Scores Row */}
            <div className="grid grid-cols-4 gap-4">
              <ScoreIndicator 
                label="Risk" 
                value={iQube.riskScore} 
                size="sm"
                scoreType="risk"
              />
              <ScoreIndicator 
                label="Accuracy" 
                value={iQube.accuracyScore} 
                size="sm"
                scoreType="accuracy"
              />
              <ScoreIndicator 
                label="Verifiability" 
                value={iQube.verifiabilityScore} 
                size="sm"
                scoreType="verifiability"
              />
              <ScoreIndicator 
                label="Sensitivity" 
                value={iQube.sensitivityScore} 
                size="sm"
                scoreType="sensitivity"
              />
            </div>
          </div>

          <Separator />

          {/* BlakQube Data Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-900">BlakQube Data</h3>
              <div className="text-sm text-slate-500 uppercase tracking-wide">SOURCE</div>
            </div>
            
            <div className="space-y-3">
              {blakQubeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="text-sm text-slate-600 mb-1">{item.key}</div>
                    <div className="font-medium text-slate-900 break-words">
                      {item.value}
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                      <span className="text-white text-lg">
                        {getSourceIcon(item.source)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(iQube)} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit iQube
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
