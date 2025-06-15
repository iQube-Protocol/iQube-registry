
import { IQube } from '@/types/iQube';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { User, Wallet, Copy, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface MetaQubeSectionProps {
  iQube: IQube;
}

const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  ToolQube: 'bg-purple-100 text-purple-800',
  ModelQube: 'bg-orange-100 text-orange-800',
  AgentQube: 'bg-red-100 text-red-800'
};

const businessModelColors = {
  Buy: 'bg-emerald-100 text-emerald-800',
  Sell: 'bg-orange-100 text-orange-800',
  Rent: 'bg-purple-100 text-purple-800',
  Lease: 'bg-indigo-100 text-indigo-800',
  Subscribe: 'bg-cyan-100 text-cyan-800',
  Stake: 'bg-yellow-100 text-yellow-800',
  License: 'bg-pink-100 text-pink-800',
  Donate: 'bg-gray-100 text-gray-800'
};

export const MetaQubeSection = ({ iQube }: MetaQubeSectionProps) => {
  const handleCopyAddress = () => {
    if (iQube.publicWalletKey) {
      navigator.clipboard.writeText(iQube.publicWalletKey);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard.",
      });
    }
  };

  return (
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

      <div className="flex items-center space-x-2 mb-4">
        <Badge className={cn('text-sm', typeColors[iQube.iQubeType])}>
          {iQube.iQubeType}
        </Badge>
        <Badge className={cn('text-sm', businessModelColors[iQube.businessModel])}>
          {iQube.businessModel}
        </Badge>
        <Badge variant="secondary" className="text-sm">
          {iQube.ownerIdentifiability}
        </Badge>
      </div>

      {/* Data Subject Identifiability */}
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-600">Data Subject Identifiability:</span>
        <Badge variant="outline" className="text-sm">
          {iQube.dataSubjectIdentifiability}
        </Badge>
      </div>

      {iQube.publicWalletKey && (
        <div className="flex items-center space-x-2 mb-4">
          <Wallet className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600 font-mono truncate max-w-xs">
            {iQube.publicWalletKey}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyAddress}
            className="p-1 h-6 w-6"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm text-slate-700">{iQube.iQubeDescription}</p>
      </div>

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
  );
};
