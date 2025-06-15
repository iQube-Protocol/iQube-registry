
import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit } from 'lucide-react';
import { formatPrice } from '@/utils/priceUtils';
import { MetaQubeSection } from './modal/MetaQubeSection';
import { BlakQubeDataSection } from './modal/BlakQubeDataSection';

interface IQubeDetailModalProps {
  iQube: IQube | null;
  open: boolean;
  onClose: () => void;
  onEdit: (iQube: IQube) => void;
}

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
          <MetaQubeSection iQube={iQube} />

          <Separator />

          <BlakQubeDataSection iQube={iQube} />

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
