
export interface IQube {
  id: string;
  iQubeName: string;
  iQubeCreator: string;
  iQubeDescription: string;
  ownerType: 'Individual' | 'Organisation';
  iQubeType: 'DataQube' | 'ContentQube' | 'ToolQube' | 'ModelQube' | 'AgentQube';
  ownerIdentifiability: 'Anonymous' | 'Semi-Anonymous' | 'Semi-Identifiable' | 'Identifiable';
  transactionDate: string;
  sensitivityScore: number;
  verifiabilityScore: number;
  accuracyScore: number;
  riskScore: number;
  businessModel: 'Buy' | 'Sell' | 'Rent' | 'Lease' | 'Subscribe' | 'Stake' | 'License' | 'Donate';
  price: number;
  priceTo: 'Use' | 'Mint' | 'Purchase' | 'Sell' | 'Lease' | 'Rent' | 'Stake' | 'License';
  durationOfRights: 'Forever' | 'Per Use' | 'Per Minute' | 'Per Hour' | 'Per Day' | 'Per Week' | 'Per Month' | 'Per Year';
  publicWalletKey: string;
  blakQubeSchema: 'Structured' | 'Unstructured' | 'Access Keys';
  createdAt: string;
  updatedAt: string;
}

export interface IQubeFormData extends Omit<IQube, 'id' | 'createdAt' | 'updatedAt'> {}

export interface AnalyticsData {
  totalIQubes: number;
  averageRiskScore: number;
  averagePrice: number;
  popularTypes: Array<{ type: string; count: number }>;
  businessModelDistribution: Array<{ model: string; count: number }>;
  monthlyTransactions: Array<{ month: string; count: number }>;
}
