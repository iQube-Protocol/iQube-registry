
export interface IQube {
  id: string;
  iQubeName: string;
  iQubeCreator: string;
  iQubeDescription: string;
  ownerType: 'Individual' | 'Organisation';
  iQubeType: 'DataQube' | 'ContentQube' | 'ToolQube' | 'ModelQube' | 'AgentQube';
  ownerIdentifiability: 'Anonymous' | 'Semi-Anonymous' | 'Semi-Identifiable' | 'Identifiable';
  dataSubjectIdentifiability: 'Anonymous' | 'Semi-Anonymous' | 'Semi-Identifiable' | 'Identifiable';
  transactionDate: string;
  sensitivityScore: number;
  verifiabilityScore: number;
  accuracyScore: number;
  riskScore: number;
  businessModel: 'Buy' | 'Sell' | 'Rent' | 'Lease' | 'Subscribe' | 'Stake' | 'License' | 'Donate';
  price: number;
  priceTo: 'Use' | 'Mint' | 'Purchase' | 'Sell' | 'Lease' | 'Rent' | 'Stake' | 'License' | 'Donate';
  durationOfRights: 'Forever' | 'Per Use' | 'Per Minute' | 'Per Hour' | 'Per Day' | 'Per Week' | 'Per Month' | 'Per Year';
  publicWalletKey: string;
  blakQubeSchema: 'Structured' | 'Unstructured' | 'Access Keys';
  iQubeInstanceType: 'template' | 'instance';
  templateId?: string; // For instances, reference to the original template
  // New fields for encryption and instance management
  instanceCount?: number; // For templates, count of minted instances
  isEncrypted?: boolean; // For instances, whether data is encrypted by protocol
  encryptionStatus?: 'pending' | 'minted' | 'decrypted'; // For instances, protocol encryption state
  hasDecryptionKey?: boolean; // For instances, whether user has access to decrypt
  createdAt: string;
  updatedAt: string;
  // Calculated composite scores
  trustScore?: number;
  reliabilityIndex?: number;
}

export interface IQubeFormData extends Omit<IQube, 'id' | 'createdAt' | 'updatedAt' | 'trustScore' | 'reliabilityIndex' | 'instanceCount' | 'isEncrypted' | 'encryptionStatus' | 'hasDecryptionKey'> {}
