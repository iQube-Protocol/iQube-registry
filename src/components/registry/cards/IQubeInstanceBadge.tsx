
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IQube } from '@/types/iQube';

interface IQubeInstanceBadgeProps {
  iQube: IQube;
  onViewInstances?: (templateId: string) => void;
}

export const IQubeInstanceBadge = ({ iQube, onViewInstances }: IQubeInstanceBadgeProps) => {
  if (iQube.iQubeInstanceType === 'instance') {
    // Show encryption status for instances
    return (
      <div className="flex items-center gap-2">
        <Badge variant={iQube.hasDecryptionKey ? "default" : "secondary"} className="text-xs">
          {iQube.hasDecryptionKey ? "🔓 Accessible" : "🔒 Encrypted"}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Instance
        </Badge>
      </div>
    );
  }

  if (iQube.iQubeInstanceType === 'template') {
    // Show instance count for templates
    const instanceCount = iQube.instanceCount || 0;
    console.log(`Rendering template ${iQube.iQubeName} with instanceCount: ${instanceCount}`);
    
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          Template
        </Badge>
        {instanceCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Clicking instances button for template ${iQube.id}`);
              onViewInstances?.(iQube.id);
            }}
            className="h-6 px-2 text-xs hover:bg-blue-50 border border-blue-200"
          >
            <Badge variant="secondary" className="text-xs mr-1">
              {instanceCount}
            </Badge>
            Instance{instanceCount !== 1 ? 's' : ''}
          </Button>
        )}
        {instanceCount === 0 && (
          <Badge variant="secondary" className="text-xs whitespace-nowrap min-w-fit px-3">
            0 Instances
          </Badge>
        )}
      </div>
    );
  }

  return null;
};
