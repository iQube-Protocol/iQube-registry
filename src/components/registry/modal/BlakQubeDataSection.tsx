
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

// Sample dictionary values for decrypted instances
const getSampleValue = (key: string): string => {
  const sampleData: Record<string, string> = {
    'First-Name': 'John',
    'First Name': 'John',
    'Last-Name': 'Doe',
    'Last name': 'Doe',
    '@Qrypto ID': '@johndoe_crypto',
    '@MonDAI ID': '@johndoe_mondai',
    '@KNYT ID': '@johndoe_knyt',
    'Profession': 'Blockchain Developer',
    'Local-City': 'San Francisco',
    'Local City': 'San Francisco',
    'Email': 'john.doe@example.com',
    'EVM Public Key': '0x742d35Cc6654c0532925a3b8c17c9AFcEB4b0b4F',
    'EVM-Public Key': '0x742d35Cc6654c0532925a3b8c17c9AFcEB4b0b4F',
    'BTC-Public-Key': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    'ThirdWeb Public Key': '0x123abc456def789ghi012jkl345mno678pqr901',
    'LinkedIn ID': 'johndoe',
    'LinkedIn-ID': 'johndoe',
    'LinkedIn-Profile-URL': 'https://linkedin.com/in/johndoe',
    'Twitter handle': '@johndoe',
    'Twitter-Handle': '@johndoe',
    'Twitter-ID': '@johndoe',
    'Telegram Handle': '@johndoe_tg',
    'Telegram-Handle': '@johndoe_tg',
    'Telegram-ID': '@johndoe_tg',
    'Discord Handle': 'johndoe#1234',
    'Discord-Handle': 'johndoe#1234',
    'Discord-ID': 'johndoe#1234',
    'Instagram Handle': '@johndoe_ig',
    'Instagram-Handle': '@johndoe_ig',
    'Luma-ID': 'johndoe_luma',
    'YouTube ID': 'johndoe_yt',
    'Facebook ID': 'johndoe_fb',
    'Tik Tok Handle': '@johndoe_tiktok',
    'Web3 Interests': 'DeFi, NFTs, DAOs',
    'Tokens-of-Interest': 'ETH, BTC, MATIC',
    'Associated Public Keys': '0x456...def, 0x789...ghi',
    'Phone Number': '+1-555-123-4567',
    'Age': '28',
    'Address': '123 Crypto Street, San Francisco, CA 94105',
    'OM Member since': '2023-01-15',
    'OM Tier/Status': 'Gold',
    'Metaiye Shares Owned': '150',
    '$KNYT COYN Owned': '25,000',
    'MetaKeep Public Key': '0xabc123def456ghi789jkl012mno345pqr678',
    'Motion Comics Owned': '12',
    'Paper Comics Owned': '8',
    'Digital Comics Owned': '45',
    'KNYT Posters Owned': '6',
    'KNYT Cards Owned': '23',
    'Characters Owned': '7',
    'AI Biometric Data': 'Facial Recognition Score: 98.5%',
    'Social Graph Score': '8.7/10',
    // AI/Tool specific data
    'Agent Name': 'CryptoTrader Pro',
    'Trading Strategy': 'DCA + Momentum',
    'Risk Tolerance': 'Medium',
    'Portfolio Size': '$50,000',
    'API Keys': 'Binance, Coinbase Pro',
    'Exchange Integrations': '5 exchanges connected',
    'Performance Metrics': '+15.3% YTD',
    'Backtesting Results': '65% win rate',
    'License Key': 'PRO-2024-ABC123',
    'Support Contact': 'support@tradingagent.com',
    // Default fallbacks
    'Name': 'Sample Data',
    'Creator': 'Sample Creator',
    'Type': 'DataQube',
    'Business Model': 'Buy',
    'Owner Type': 'Individual',
    'Identifiability': 'Identifiable',
    'Rights Duration': 'Forever',
    'Schema Type': 'Structured',
    'Description': 'Sample description data',
    'Price': '100',
    'Public Wallet Key': '0x742d35Cc6654c0532925a3b8c17c9AFcEB4b0b4F'
  };
  
  return sampleData[key] || 'Sample data';
};

// Generate masked value based on key type
const getMaskedValue = (key: string): string => {
  if (key.toLowerCase().includes('email')) {
    return '••••••••@••••••.com';
  }
  if (key.toLowerCase().includes('address') || key.toLowerCase().includes('wallet') || key.toLowerCase().includes('key')) {
    return '0x••••••••••••••••••••••••••••••••••••••••';
  }
  if (key.toLowerCase().includes('twitter') || key.toLowerCase().includes('telegram') || key.toLowerCase().includes('discord') || key.toLowerCase().includes('instagram') || key.toLowerCase().includes('tik tok')) {
    return '@••••••••••';
  }
  if (key.toLowerCase().includes('linkedin') || key.toLowerCase().includes('github') || key.toLowerCase().includes('youtube') || key.toLowerCase().includes('facebook')) {
    return 'profile.com/••••••••••';
  }
  if (key.toLowerCase().includes('phone')) {
    return '+1-•••-•••-••••';
  }
  if (key.toLowerCase().includes('age') || key.toLowerCase().includes('owned') || key.toLowerCase().includes('score') || key.toLowerCase().includes('size')) {
    return '•••';
  }
  return '••••••••••••••••••••';
};

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
                   item.key.includes('wallet') || item.key.includes('key') ? 'Wallet address field' :
                   item.key.includes('twitter') || item.key.includes('telegram') || item.key.includes('discord') || item.key.includes('instagram') ? 'Social media field' :
                   item.key.includes('github') || item.key.includes('linkedin') || item.key.includes('youtube') || item.key.includes('facebook') ? 'Profile link field' :
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
                  // Decrypted: show actual sample data
                  getSampleValue(item.key)
                ) : (
                  // Encrypted: show masked values
                  <span className="text-slate-400 font-mono">
                    {getMaskedValue(item.key)}
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
