
import { IQube } from '@/types/iQube';

export interface BlakQubeDataItem {
  key: string;
  value: string;
  source: string;
}

export const getBlakQubeData = (iQube: IQube): BlakQubeDataItem[] => {
  // Qrypto Profile structure
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
  
  // MonDAI Profile structure
  if (iQube.id === '10' || iQube.iQubeName === 'MonDAI Profile') {
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
      { key: 'Associated Public Keys', value: '', source: 'custom' }
    ];
  }
  
  // KNYT Profile structure - Updated with your schema
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
