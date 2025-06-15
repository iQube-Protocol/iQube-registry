
import { IQube } from '@/types/iQube';
import { cn } from '@/lib/utils';
import { getBlakQubeData } from './blakQubeDataUtils';
import { getSourceIcon, getSourceColor } from './sourceIconUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Eye } from 'lucide-react';

interface BlakQubeDataSectionProps {
  iQube: IQube;
  onDecrypt?: () => void;
}

export const BlakQubeDataSection = ({ iQube, onDecrypt }: BlakQubeDataSectionProps) => {
  const blakQubeData = getBlakQubeData(iQube);

  // For templates, show schema structure only
  if (iQube.iQubeInstanceType === 'template') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900">BlakQube Schema</h3>
          <Badge variant="outline" className="text-sm">
            Template Structure
          </Badge>
        </div>
        
        <div className="space-y-3">
          {blakQubeData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex-1">
                <div className="text-sm text-slate-600 mb-1">{item.key}</div>
                <div className="font-medium text-slate-400 italic">
                  {item.key.includes('email') ? 'Email field' :
                   item.key.includes('address') ? 'Address field' :
                   item.key.includes('wallet') ? 'Wallet address field' :
                   item.key.includes('twitter') ? 'Social media field' :
                   item.key.includes('github') ? 'Profile link field' :
                   item.key.includes('linkedin') ? 'Professional profile field' :
                   'Data field'}
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className={cn("flex items-center justify-center w-10 h-10 rounded-full", getSourceColor(item.source))}>
                  {getSourceIcon(item.source)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For instances, show encryption status and data
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900">BlakQube Data</h3>
        <div className="flex items-center gap-3">
          {iQube.hasDecryptionKey ? (
            <Badge variant="default" className="flex items-center gap-1">
              <Unlock className="w-3 h-3" />
              Decrypted
            </Badge>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Encrypted
              </Badge>
              {onDecrypt && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDecrypt}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  Decrypt
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {blakQubeData.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
            <div className="flex-1">
              <div className="text-sm text-slate-600 mb-1">{item.key}</div>
              <div className="font-medium text-slate-900 break-words">
                {iQube.hasDecryptionKey ? (
                  item.value
                ) : (
                  <span className="text-slate-400 font-mono">
                    {item.key.includes('email') ? '••••••••@••••••.com' :
                     item.key.includes('address') ? '••••••••••••••••••••••••••••••••••••••••' :
                     item.key.includes('wallet') ? '0x••••••••••••••••••••••••••••••••••••••••' :
                     item.key.includes('twitter') ? '@••••••••••' :
                     item.key.includes('github') ? 'github.com/••••••••••' :
                     item.key.includes('linkedin') ? 'linkedin.com/in/••••••••••' :
                     '••••••••••••••••••••'}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className={cn("flex items-center justify-center w-10 h-10 rounded-full", getSourceColor(item.source))}>
                {getSourceIcon(item.source)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
