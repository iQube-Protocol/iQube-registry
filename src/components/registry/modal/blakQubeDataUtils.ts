
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
