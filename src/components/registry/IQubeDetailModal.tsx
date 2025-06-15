
import { IQube } from '@/types/iQube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Calendar, User, Wallet, Copy, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/priceUtils';
import { toast } from '@/hooks/use-toast';

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

// BlakQube data structures for different profile types
const getBlakQubeData = (iQube: IQube) => {
  // Qrypto Profile structure
  if (iQube.id === '1' || iQube.iQubeName === 'Qrypto Profile') {
    return [
      { key: 'First-Name', value: 'John', source: 'linkedin' },
      { key: 'Last-Name', value: 'Doe', source: 'linkedin' },
      { key: '@Qrypto ID', value: '@johndoe_qrypto', source: 'qrypto' },
      { key: 'Profession', value: 'Blockchain Developer', source: 'linkedin' },
      { key: 'Local-City', value: 'San Francisco', source: 'facebook' },
      { key: 'Email', value: 'john.doe@email.com', source: 'linkedin' },
      { key: 'EVM Public Key', value: '0x742d35Cc6532C4532f5ccC1b1f94396aAbc4532e', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '0x8f4A9b2c1d5e8f3a6b9c2d5e8f3a6b9c2d5e8f3a', source: 'thirdweb' },
      { key: 'LinkedIn ID', value: 'john-doe-dev', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: 'linkedin.com/in/john-doe-dev', source: 'linkedin' },
      { key: 'Twitter-Handle', value: '@johnDoeWeb3', source: 'twitter' },
      { key: 'Telegram-Handle', value: '@johndoe_crypto', source: 'telegram' },
      { key: 'Discord-Handle', value: 'JohnDoe#1234', source: 'discord' },
      { key: 'Instagram-Handle', value: '@johndoe_crypto', source: 'instagram' },
      { key: 'Luma-ID', value: 'johndoe.luma.co', source: 'luma' },
      { key: 'YouTube ID', value: 'JohnDoeBlockchain', source: 'youtube' },
      { key: 'Facebook ID', value: 'john.doe.blockchain', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '@johndoecrypto', source: 'tiktok' },
      { key: 'Web3 Interests', value: 'DeFi, NFTs, DAOs', source: 'custom' },
      { key: 'Tokens-of-Interest', value: 'ETH, BTC, USDC, UNI', source: 'custom' },
      { key: 'Associated Public Keys', value: '3 verified wallets', source: 'custom' }
    ];
  }
  
  // MonDAI Profile structure
  if (iQube.id === '10' || iQube.iQubeName === 'MonDAI Profile') {
    return [
      { key: 'First-Name', value: 'Sarah', source: 'linkedin' },
      { key: 'Last-Name', value: 'Chen', source: 'linkedin' },
      { key: '@MonDAI ID', value: '@sarahchen_mondai', source: 'mondai' },
      { key: 'Profession', value: 'Smart Contract Engineer', source: 'linkedin' },
      { key: 'Local-City', value: 'Austin', source: 'facebook' },
      { key: 'Email', value: 'sarah.chen@email.com', source: 'linkedin' },
      { key: 'EVM-Public Key', value: '0x8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '0x1f2e3d4c5b6a9f8e7d6c5b4a3f2e1d9c8b7a6f5e', source: 'thirdweb' },
      { key: 'LinkedIn-ID', value: 'sarah-chen-blockchain', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: 'linkedin.com/in/sarah-chen-blockchain', source: 'linkedin' },
      { key: 'Twitter-ID', value: '@SarahChenDev', source: 'twitter' },
      { key: 'Telegram-ID', value: '@sarahchen_dev', source: 'telegram' },
      { key: 'Discord-ID', value: 'SarahChen#5678', source: 'discord' },
      { key: 'Instagram-Handle', value: '@sarahchen_tech', source: 'instagram' },
      { key: 'Luma-ID', value: 'sarahchen.luma.co', source: 'luma' },
      { key: 'YouTube ID', value: 'SarahChenCoding', source: 'youtube' },
      { key: 'Facebook ID', value: 'sarah.chen.dev', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '@sarahchencode', source: 'tiktok' },
      { key: 'Web3 Interests', value: 'Smart Contracts, DeFi, Layer 2', source: 'custom' },
      { key: 'Tokens-of-Interest', value: 'ETH, MATIC, ARB, OP', source: 'custom' },
      { key: 'Associated Public Keys', value: '5 verified wallets', source: 'custom' }
    ];
  }
  
  // KNYT Profile structure
  if (iQube.id === '11' || iQube.iQubeName === 'KNYT Profile') {
    return [
      { key: 'First Name', value: 'Marcus', source: 'linkedin' },
      { key: 'Last name', value: 'Rodriguez', source: 'linkedin' },
      { key: '@Qrypto ID', value: '@marcusrod_qrypto', source: 'qrypto' },
      { key: 'Profession', value: 'NFT Artist & Collector', source: 'linkedin' },
      { key: 'Local City', value: 'Miami', source: 'facebook' },
      { key: 'Email', value: 'marcus.rodriguez@email.com', source: 'linkedin' },
      { key: 'EVM Public Key', value: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b', source: 'thirdweb' },
      { key: 'LinkedIn ID', value: 'marcus-rodriguez-nft', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: 'linkedin.com/in/marcus-rodriguez-nft', source: 'linkedin' },
      { key: 'Twitter handle', value: '@MarcusNFTArt', source: 'twitter' },
      { key: 'Telegram Handle', value: '@marcusrod_nft', source: 'telegram' },
      { key: 'Discord Handle', value: 'MarcusArt#9012', source: 'discord' },
      { key: 'Instagram Handle', value: '@marcus_nft_art', source: 'instagram' },
      { key: 'Luma-ID', value: 'marcusrodriguez.luma.co', source: 'luma' },
      { key: 'YouTube ID', value: 'MarcusNFTStudio', source: 'youtube' },
      { key: 'Facebook ID', value: 'marcus.rodriguez.art', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '@marcusnftart', source: 'tiktok' },
      { key: 'Web3 Interests', value: 'NFTs, Digital Art, Metaverse', source: 'custom' },
      { key: 'Tokens-of-Interest', value: 'ETH, KNYT, MATIC, SOL', source: 'custom' },
      { key: 'Associated Public Keys', value: '4 verified wallets', source: 'custom' },
      { key: '@KNYT ID', value: '@marcusrod_knyt', source: 'knyt' },
      { key: 'Phone Number', value: '+1 (555) 123-4567', source: 'custom' },
      { key: 'Age', value: '28', source: 'custom' },
      { key: 'Address', value: 'Miami, FL, USA', source: 'custom' },
      { key: 'OM Member since', value: 'January 2023', source: 'knyt' },
      { key: 'OM Tier/Status', value: 'Gold Member', source: 'knyt' },
      { key: 'Metaiye Shares Owned', value: '150 shares', source: 'knyt' },
      { key: '$KNYT COYN Owned', value: '2,500 KNYT', source: 'knyt' },
      { key: 'MetaKeep Public Key', value: '0x7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c', source: 'metakeep' },
      { key: 'Motion Comics Owned', value: '12 editions', source: 'knyt' },
      { key: 'Paper Comics Owned', value: '8 physical copies', source: 'knyt' },
      { key: 'Digital Comics Owned', value: '45 NFTs', source: 'knyt' },
      { key: 'KNYT Posters Owned', value: '6 limited editions', source: 'knyt' },
      { key: 'KNYT Cards Owned', value: '23 trading cards', source: 'knyt' },
      { key: 'Characters Owned', value: '5 unique characters', source: 'knyt' }
    ];
  }
  
  // Default fallback for other iQubes
  return [
    { key: 'Name', value: iQube.iQubeName, source: 'custom' },
    { key: 'Creator', value: iQube.iQubeCreator, source: 'custom' },
    { key: 'Type', value: iQube.iQubeType, source: 'custom' },
    { key: 'Business Model', value: iQube.businessModel, source: 'custom' },
    { key: 'Owner Type', value: iQube.ownerType, source: 'custom' },
    { key: 'Identifiability', value: iQube.ownerIdentifiability, source: 'custom' },
    { key: 'Rights Duration', value: iQube.durationOfRights, source: 'custom' },
    { key: 'Schema Type', value: iQube.blakQubeSchema, source: 'custom' }
  ];
};

const getSourceIcon = (source: string) => {
  const iconProps = { className: "w-4 h-4 text-white" };
  
  switch (source) {
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'youtube':
      return <Youtube {...iconProps} />;
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'ethereum':
      return <span className="text-white text-sm font-bold">Ξ</span>;
    case 'bitcoin':
      return <span className="text-white text-sm font-bold">₿</span>;
    case 'thirdweb':
      return <span className="text-white text-xs font-bold">3W</span>;
    case 'telegram':
      return <span className="text-white text-xs font-bold">TG</span>;
    case 'discord':
      return <span className="text-white text-xs font-bold">DC</span>;
    case 'instagram':
      return <span className="text-white text-xs font-bold">IG</span>;
    case 'luma':
      return <span className="text-white text-xs font-bold">LU</span>;
    case 'tiktok':
      return <span className="text-white text-xs font-bold">TT</span>;
    case 'qrypto':
      return <span className="text-white text-xs font-bold">QR</span>;
    case 'mondai':
      return <span className="text-white text-xs font-bold">MD</span>;
    case 'knyt':
      return <span className="text-white text-xs font-bold">KN</span>;
    case 'metakeep':
      return <span className="text-white text-xs font-bold">MK</span>;
    case 'custom':
    default:
      return <span className="text-white text-xs">•</span>;
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'linkedin':
      return 'bg-blue-600';
    case 'twitter':
      return 'bg-sky-500';
    case 'youtube':
      return 'bg-red-600';
    case 'facebook':
      return 'bg-blue-700';
    case 'ethereum':
      return 'bg-purple-600';
    case 'bitcoin':
      return 'bg-orange-500';
    case 'thirdweb':
      return 'bg-purple-700';
    case 'telegram':
      return 'bg-blue-500';
    case 'discord':
      return 'bg-indigo-600';
    case 'instagram':
      return 'bg-pink-600';
    case 'luma':
      return 'bg-green-600';
    case 'tiktok':
      return 'bg-black';
    case 'qrypto':
      return 'bg-emerald-600';
    case 'mondai':
      return 'bg-indigo-700';
    case 'knyt':
      return 'bg-red-700';
    case 'metakeep':
      return 'bg-teal-600';
    case 'custom':
    default:
      return 'bg-slate-500';
  }
};

export const IQubeDetailModal = ({ iQube, open, onClose, onEdit }: IQubeDetailModalProps) => {
  if (!iQube) return null;

  const priceDisplay = formatPrice(iQube.price);
  const blakQubeData = getBlakQubeData(iQube);

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
                <Badge className={cn('text-sm', businessModelColors[iQube.businessModel])}>
                  {iQube.businessModel}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {iQube.ownerIdentifiability}
                </Badge>
              </div>
              {/* Contract Address */}
              {iQube.publicWalletKey && (
                <div className="flex items-center space-x-2 mb-2">
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

            {/* Description */}
            <div className="mb-4">
              <p className="text-sm text-slate-700">{iQube.iQubeDescription}</p>
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
                    <div className={cn("flex items-center justify-center w-10 h-10 rounded-full", getSourceColor(item.source))}>
                      {getSourceIcon(item.source)}
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
