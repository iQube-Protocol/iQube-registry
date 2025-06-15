
import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/utils/priceUtils';
import { MetaQubeSection } from './modal/MetaQubeSection';
import { BlakQubeDataSection } from './modal/BlakQubeDataSection';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

interface IQubeDetailModalProps {
  iQube: IQube | null;
  open: boolean;
  onClose: () => void;
  onEdit: (iQube: IQube) => void;
  onViewTemplate?: (templateId: string) => void;
}

export const IQubeDetailModal = ({ 
  iQube, 
  open, 
  onClose, 
  onEdit,
  onViewTemplate 
}: IQubeDetailModalProps) => {
  if (!iQube) return null;

  const priceDisplay = formatPrice(iQube.price);
  const isInstance = iQube.iQubeInstanceType === 'instance';

  const handleDecrypt = () => {
    // TODO: Implement decryption logic
    console.log('Decrypt instance:', iQube.id);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            {isInstance && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      className="cursor-pointer" 
                      onClick={() => onViewTemplate?.(iQube.templateId!)}
                    >
                      Template
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Instance</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {iQube.iQubeName}
                </DialogTitle>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-slate-600">by {iQube.iQubeCreator}</span>
                  <Badge variant="outline" className="text-xs">
                    {isInstance ? 'Instance' : 'Template'}
                  </Badge>
                  {isInstance && (
                    <Badge 
                      variant={iQube.hasDecryptionKey ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {iQube.hasDecryptionKey ? "🔓 Accessible" : "🔒 Encrypted"}
                    </Badge>
                  )}
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
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <MetaQubeSection iQube={iQube} />

          <Separator />

          <BlakQubeDataSection 
            iQube={iQube} 
            onDecrypt={isInstance && !iQube.hasDecryptionKey ? handleDecrypt : undefined}
          />

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(iQube)} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit {isInstance ? 'Instance' : 'Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
