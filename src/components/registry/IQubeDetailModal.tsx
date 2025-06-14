import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Calendar, User, Shield, Wallet } from 'lucide-react';
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
  AigentQube: 'bg-red-100 text-red-800'
};

export const IQubeDetailModal = ({ iQube, open, onClose, onEdit }: IQubeDetailModalProps) => {
  if (!iQube) return null;

  const priceDisplay = formatPrice(iQube.price);

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
                <Badge variant="outline" className="text-sm">
                  {iQube.ownerType}
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
                {iQube.businessModel} to {iQube.priceTo}
              </p>
              <p className="text-xs text-slate-500">
                {iQube.durationOfRights}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Created by</h3>
                <p className="text-slate-600">{iQube.iQubeCreator}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-700 leading-relaxed">{iQube.iQubeDescription}</p>
          </div>

          <Separator />

          {/* Scores Grid */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreIndicator 
                label="Sensitivity Score" 
                value={iQube.sensitivityScore} 
                size="lg"
                color="purple"
              />
              <ScoreIndicator 
                label="Verifiability Score" 
                value={iQube.verifiabilityScore} 
                size="lg"
                color="blue"
              />
              <ScoreIndicator 
                label="Accuracy Score" 
                value={iQube.accuracyScore} 
                size="lg"
                color="green"
              />
              <ScoreIndicator 
                label="Risk Score" 
                value={iQube.riskScore} 
                size="lg"
                color="red"
              />
            </div>
          </div>

          <Separator />

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Technical Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">BlakQube Schema:</span>
                  <span className="font-medium">{iQube.blakQubeSchema}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Business Model:</span>
                  <span className="font-medium">{iQube.businessModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rights Duration:</span>
                  <span className="font-medium">{iQube.durationOfRights}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Transaction Details</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">Transaction Date:</span>
                  <span className="font-medium">
                    {new Date(iQube.transactionDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">Wallet:</span>
                  <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                    {iQube.publicWalletKey || 'Not provided'}
                  </span>
                </div>
              </div>
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
