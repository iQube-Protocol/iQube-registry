

import { IQube } from '@/types/iQube';

export interface BlakQubeDataItem {
  key: string;
  value: string;
  source: string;
}

export const getBlakQubeData = (iQube: IQube): BlakQubeDataItem[] => {
  // Qrypto Profile structure - updated with correct fields
  if (iQube.id === '1' || iQube.iQubeName === 'Qrypto Profile') {
    return [
      { key: 'First-Name', value: '', source: 'linkedin' },
      { key: 'Last-Name', value: '', source: 'linkedin' },
      { key: '@Qrypto ID', value: '', source: 'qrypto' },
      { key: 'Profession', value: '', source: 'linkedin' },
      { key: 'Local-City', value: '', source: 'facebook' },
      { key: 'Email', value: '', source: 'linkedin' },
      { key: 'EVM Public Key', value: '', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: '', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '', source: 'thirdweb' },
      { key: 'LinkedIn ID', value: '', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: '', source: 'linkedin' },
      { key: 'Twitter-Handle', value: '', source: 'twitter' },
      { key: 'Telegram-Handle', value: '', source: 'telegram' },
      { key: 'Discord-Handle', value: '', source: 'discord' },
      { key: 'Instagram-Handle', value: '', source: 'instagram' },
      { key: 'Luma-ID', value: '', source: 'luma' },
      { key: 'YouTube ID', value: '', source: 'youtube' },
      { key: 'Facebook ID', value: '', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '', source: 'tiktok' },
      { key: 'Web3 Interests', value: '', source: 'custom' },
      { key: 'Tokens-of-Interest', value: '', source: 'custom' },
      { key: 'Associated Public Keys', value: '', source: 'custom' }
    ];
  }
  
  // Trading Agent - AI/automation focused
  if (iQube.id === '2' || iQube.iQubeName === 'Trading Agent') {
    return [
      { key: 'Agent Name', value: '', source: 'custom' },
      { key: 'Trading Strategy', value: '', source: 'custom' },
      { key: 'Risk Tolerance', value: '', source: 'custom' },
      { key: 'Portfolio Size', value: '', source: 'custom' },
      { key: 'API Keys', value: '', source: 'custom' },
      { key: 'Exchange Integrations', value: '', source: 'custom' },
      { key: 'Performance Metrics', value: '', source: 'custom' },
      { key: 'Backtesting Results', value: '', source: 'custom' },
      { key: 'License Key', value: '', source: 'custom' },
      { key: 'Support Contact', value: '', source: 'custom' }
    ];
  }

  // Market Sentiment Dataset - data focused
  if (iQube.id === '3' || iQube.iQubeName === 'Market Sentiment Dataset') {
    return [
      { key: 'Data Sources', value: '', source: 'twitter' },
      { key: 'Update Frequency', value: '', source: 'custom' },
      { key: 'Data Format', value: '', source: 'custom' },
      { key: 'API Endpoint', value: '', source: 'custom' },
      { key: 'Sample Data', value: '', source: 'custom' },
      { key: 'Documentation URL', value: '', source: 'custom' },
      { key: 'License Terms', value: '', source: 'custom' },
      { key: 'Support Contact', value: '', source: 'custom' },
      { key: 'Twitter API Access', value: '', source: 'twitter' },
      { key: 'Reddit Integration', value: '', source: 'custom' }
    ];
  }

  // Video Tutorial Collection - content focused
  if (iQube.id === '4' || iQube.iQubeName === 'Video Tutorial Collection') {
    return [
      { key: 'Total Videos', value: '', source: 'youtube' },
      { key: 'Duration (Hours)', value: '', source: 'custom' },
      { key: 'Skill Level', value: '', source: 'custom' },
      { key: 'Topics Covered', value: '', source: 'custom' },
      { key: 'YouTube Channel', value: '', source: 'youtube' },
      { key: 'Instructor Name', value: '', source: 'custom' },
      { key: 'Course Materials', value: '', source: 'custom' },
      { key: 'Completion Certificate', value: '', source: 'custom' },
      { key: 'Student Reviews', value: '', source: 'custom' },
      { key: 'Access Method', value: '', source: 'custom' }
    ];
  }

  // Smart Contract Auditor - tool focused
  if (iQube.id === '5' || iQube.iQubeName === 'Smart Contract Auditor') {
    return [
      { key: 'Tool Version', value: '', source: 'custom' },
      { key: 'Supported Languages', value: '', source: 'custom' },
      { key: 'Vulnerability Database', value: '', source: 'custom' },
      { key: 'Gas Analysis', value: '', source: 'ethereum' },
      { key: 'Report Format', value: '', source: 'custom' },
      { key: 'API Access', value: '', source: 'custom' },
      { key: 'Installation Guide', value: '', source: 'custom' },
      { key: 'Support Documentation', value: '', source: 'custom' },
      { key: 'License Key', value: '', source: 'custom' },
      { key: 'Update Schedule', value: '', source: 'custom' }
    ];
  }

  // GPT-4 Finance Model - AI model focused
  if (iQube.id === '6' || iQube.iQubeName === 'GPT-4 Finance Model') {
    return [
      { key: 'Model Version', value: '', source: 'custom' },
      { key: 'Training Data', value: '', source: 'custom' },
      { key: 'API Endpoint', value: '', source: 'custom' },
      { key: 'Request Limits', value: '', source: 'custom' },
      { key: 'Response Format', value: '', source: 'custom' },
      { key: 'Accuracy Metrics', value: '', source: 'custom' },
      { key: 'Use Cases', value: '', source: 'custom' },
      { key: 'API Key', value: '', source: 'custom' },
      { key: 'Documentation', value: '', source: 'custom' },
      { key: 'Support Contact', value: '', source: 'custom' }
    ];
  }

  // Podcast Archive - content focused
  if (iQube.id === '7' || iQube.iQubeName === 'Podcast Archive') {
    return [
      { key: 'Total Episodes', value: '', source: 'custom' },
      { key: 'Archive Size (GB)', value: '', source: 'custom' },
      { key: 'Date Range', value: '', source: 'custom' },
      { key: 'Search Functionality', value: '', source: 'custom' },
      { key: 'Transcript Quality', value: '', source: 'custom' },
      { key: 'Download Format', value: '', source: 'custom' },
      { key: 'Metadata Fields', value: '', source: 'custom' },
      { key: 'Access Method', value: '', source: 'custom' },
      { key: 'Update Frequency', value: '', source: 'custom' },
      { key: 'Creator Contact', value: '', source: 'custom' }
    ];
  }

  // Price Prediction Model - AI model focused
  if (iQube.id === '8' || iQube.iQubeName === 'Price Prediction Model') {
    return [
      { key: 'Model Type', value: '', source: 'custom' },
      { key: 'Prediction Accuracy', value: '', source: 'custom' },
      { key: 'Supported Assets', value: '', source: 'custom' },
      { key: 'Time Horizons', value: '', source: 'custom' },
      { key: 'Data Sources', value: '', source: 'custom' },
      { key: 'API Access', value: '', source: 'custom' },
      { key: 'Backtesting Results', value: '', source: 'custom' },
      { key: 'Update Frequency', value: '', source: 'custom' },
      { key: 'License Terms', value: '', source: 'custom' },
      { key: 'Support Documentation', value: '', source: 'custom' }
    ];
  }
  
  // MonDAI Profile structures (IDs 9 and 10) - following Qrypto pattern
  if ((iQube.id === '9' || iQube.id === '10') || iQube.iQubeName === 'MonDAI Profile') {
    return [
      { key: 'First-Name', value: '', source: 'linkedin' },
      { key: 'Last-Name', value: '', source: 'linkedin' },
      { key: '@MonDAI ID', value: '', source: 'mondai' },
      { key: 'Profession', value: '', source: 'linkedin' },
      { key: 'Local-City', value: '', source: 'facebook' },
      { key: 'Email', value: '', source: 'linkedin' },
      { key: 'EVM-Public Key', value: '', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: '', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '', source: 'thirdweb' },
      { key: 'LinkedIn-ID', value: '', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: '', source: 'linkedin' },
      { key: 'Twitter-ID', value: '', source: 'twitter' },
      { key: 'Telegram-ID', value: '', source: 'telegram' },
      { key: 'Discord-ID', value: '', source: 'discord' },
      { key: 'Instagram-Handle', value: '', source: 'instagram' },
      { key: 'Luma-ID', value: '', source: 'luma' },
      { key: 'YouTube ID', value: '', source: 'youtube' },
      { key: 'Facebook ID', value: '', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '', source: 'tiktok' },
      { key: 'Web3 Interests', value: '', source: 'custom' },
      { key: 'Tokens-of-Interest', value: '', source: 'custom' },
      { key: 'Associated Public Keys', value: '', source: 'custom' },
      { key: 'AI Biometric Data', value: '', source: 'mondai' },
      { key: 'Social Graph Score', value: '', source: 'mondai' }
    ];
  }
  
  // KNYT Profile structure - entertainment focused, following Qrypto pattern
  if (iQube.id === '11' || iQube.iQubeName === 'KNYT Profile') {
    return [
      { key: 'First Name', value: '', source: 'linkedin' },
      { key: 'Last name', value: '', source: 'linkedin' },
      { key: '@Qrypto ID', value: '', source: 'qrypto' },
      { key: 'Profession', value: '', source: 'linkedin' },
      { key: 'Local City', value: '', source: 'facebook' },
      { key: 'Email', value: '', source: 'linkedin' },
      { key: 'EVM Public Key', value: '', source: 'ethereum' },
      { key: 'BTC-Public-Key', value: '', source: 'bitcoin' },
      { key: 'ThirdWeb Public Key', value: '', source: 'thirdweb' },
      { key: 'LinkedIn ID', value: '', source: 'linkedin' },
      { key: 'LinkedIn-Profile-URL', value: '', source: 'linkedin' },
      { key: 'Twitter handle', value: '', source: 'twitter' },
      { key: 'Telegram Handle', value: '', source: 'telegram' },
      { key: 'Discord Handle', value: '', source: 'discord' },
      { key: 'Instagram Handle', value: '', source: 'instagram' },
      { key: 'Luma-ID', value: '', source: 'luma' },
      { key: 'YouTube ID', value: '', source: 'youtube' },
      { key: 'Facebook ID', value: '', source: 'facebook' },
      { key: 'Tik Tok Handle', value: '', source: 'tiktok' },
      { key: 'Web3 Interests', value: '', source: 'custom' },
      { key: 'Tokens-of-Interest', value: '', source: 'custom' },
      { key: 'Associated Public Keys', value: '', source: 'custom' },
      { key: '@KNYT ID', value: '', source: 'knyt' },
      { key: 'Phone Number', value: '', source: 'custom' },
      { key: 'Age', value: '', source: 'custom' },
      { key: 'Address', value: '', source: 'custom' },
      { key: 'OM Member since', value: '', source: 'knyt' },
      { key: 'OM Tier/Status', value: '', source: 'knyt' },
      { key: 'Metaiye Shares Owned', value: '', source: 'knyt' },
      { key: '$KNYT COYN Owned', value: '', source: 'knyt' },
      { key: 'MetaKeep Public Key', value: '', source: 'metakeep' },
      { key: 'Motion Comics Owned', value: '', source: 'knyt' },
      { key: 'Paper Comics Owned', value: '', source: 'knyt' },
      { key: 'Digital Comics Owned', value: '', source: 'knyt' },
      { key: 'KNYT Posters Owned', value: '', source: 'knyt' },
      { key: 'KNYT Cards Owned', value: '', source: 'knyt' },
      { key: 'Characters Owned', value: '', source: 'knyt' }
    ];
  }
  
  // Default fallback for other iQubes with basic editable fields
  return [
    { key: 'Name', value: iQube.iQubeName, source: 'custom' },
    { key: 'Creator', value: iQube.iQubeCreator, source: 'custom' },
    { key: 'Type', value: iQube.iQubeType, source: 'custom' },
    { key: 'Business Model', value: iQube.businessModel, source: 'custom' },
    { key: 'Owner Type', value: iQube.ownerType, source: 'custom' },
    { key: 'Identifiability', value: iQube.ownerIdentifiability, source: 'custom' },
    { key: 'Rights Duration', value: iQube.durationOfRights, source: 'custom' },
    { key: 'Schema Type', value: iQube.blakQubeSchema, source: 'custom' },
    { key: 'Description', value: iQube.iQubeDescription, source: 'custom' },
    { key: 'Price', value: iQube.price.toString(), source: 'custom' },
    { key: 'Public Wallet Key', value: iQube.publicWalletKey, source: 'custom' }
  ];
};

