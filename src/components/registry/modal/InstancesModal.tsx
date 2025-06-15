
import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/utils/priceUtils';
import { Eye, Lock, Unlock } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

interface InstancesModalProps {
  template: IQube | null;
  instances: IQube[];
  open: boolean;
  onClose: () => void;
  onViewInstance: (instance: IQube) => void;
  onDecryptInstance?: (instanceId: string) => void;
}

export const InstancesModal = ({ 
  template, 
  instances, 
  open, 
  onClose, 
  onViewInstance,
  onDecryptInstance 
}: InstancesModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="cursor-pointer" onClick={onClose}>
                    Templates
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{template.iQubeName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {template.iQubeName} Instances
            </DialogTitle>
            
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>Template by {template.iQubeCreator}</span>
              <Badge variant="outline">{instances.length} Instance{instances.length !== 1 ? 's' : ''}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {instances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">No instances have been minted from this template yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {instances.map((instance) => (
                <div key={instance.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{instance.iQubeName}</h4>
                        <div className="flex items-center gap-2">
                          {instance.hasDecryptionKey ? (
                            <Badge variant="default" className="text-xs flex items-center gap-1">
                              <Unlock className="w-3 h-3" />
                              Accessible
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Encrypted
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {instance.encryptionStatus}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>Created: {new Date(instance.createdAt).toLocaleDateString()}</p>
                        <p>Transaction: {instance.transactionDate}</p>
                        <p>Contract ID: {instance.publicWalletKey}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewInstance(instance)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      
                      {!instance.hasDecryptionKey && onDecryptInstance && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onDecryptInstance(instance.id)}
                          className="flex items-center gap-2"
                        >
                          <Unlock className="w-4 h-4" />
                          Decrypt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
