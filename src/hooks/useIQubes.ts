import { useState, useEffect } from 'react';
import { IQube, IQubeFormData, AnalyticsData } from '@/types/iQube';

const STORAGE_KEY = 'iqubes-registry-v2';

// Helper function to calculate composite scores
const calculateCompositeScores = (iqube: Omit<IQube, 'trustScore' | 'reliabilityIndex'>): IQube => {
  const trustScore = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore) / 2) * 10) / 10;
  const reliabilityIndex = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore + (10 - iqube.riskScore)) / 3) * 10) / 10;
  
  return {
    ...iqube,
    trustScore,
    reliabilityIndex
  };
};

// Sample data to start with
const initialData: IQube[] = [
  calculateCompositeScores({
    id: '1',
    iQubeName: 'Qrypto Profile',
    iQubeCreator: 'Aigent Z',
    iQubeDescription: 'Comprehensive personal profile detailing crypto wallets, social handles, and web3 interests for seamless digital identity verification',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Semi-Anonymous',
    transactionDate: '2024-12-19',
    sensitivityScore: 6,
    verifiabilityScore: 8,
    accuracyScore: 7,
    riskScore: 4,
    businessModel: 'Buy',
    price: 20,
    priceTo: 'Purchase',
    durationOfRights: 'Forever',
    publicWalletKey: '0x742d35Cc6532C4532f5ccC1b1f94396aAbc4532e',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-19T10:00:00Z',
    updatedAt: '2024-12-19T10:00:00Z'
  }),
  calculateCompositeScores({
    id: '10',
    iQubeName: 'MonDAI Profile',
    iQubeCreator: 'CryptoMondays',
    iQubeDescription: 'Professional blockchain developer profile with verified credentials, social presence, and crypto portfolio data for industry networking',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Semi-Identifiable',
    transactionDate: '2024-12-20',
    sensitivityScore: 5,
    verifiabilityScore: 9,
    accuracyScore: 8,
    riskScore: 3,
    businessModel: 'Subscribe',
    price: 15,
    priceTo: 'Use',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-20T08:00:00Z',
    updatedAt: '2024-12-20T08:00:00Z'
  }),
  calculateCompositeScores({
    id: '11',
    iQubeName: 'KNYT Profile',
    iQubeCreator: 'metaKnyts',
    iQubeDescription: 'Complete community member profile including OM membership status, KNYT holdings, digital collectibles, and engagement metrics for ecosystem participation',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-21',
    sensitivityScore: 7,
    verifiabilityScore: 9,
    accuracyScore: 9,
    riskScore: 2,
    businessModel: 'License',
    price: 25,
    priceTo: 'License',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-21T12:00:00Z',
    updatedAt: '2024-12-21T12:00:00Z'
  }),
  calculateCompositeScores({
    id: '2',
    iQubeName: 'Trading Agent',
    iQubeCreator: 'CryptoMind Labs',
    iQubeDescription: 'Advanced trading algorithm for DeFi protocols with risk management capabilities',
    ownerType: 'Organisation',
    iQubeType: 'AgentQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-18',
    sensitivityScore: 8,
    verifiabilityScore: 9,
    accuracyScore: 8,
    riskScore: 7,
    businessModel: 'License',
    price: 48,
    priceTo: 'License',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x8f4A9b2c1d5e8f3a6b9c2d5e8f3a6b9c2d5e8f3a',
    blakQubeSchema: 'Access Keys',
    createdAt: '2024-12-18T14:30:00Z',
    updatedAt: '2024-12-18T14:30:00Z'
  }),
  calculateCompositeScores({
    id: '3',
    iQubeName: 'Market Sentiment Dataset',
    iQubeCreator: 'DataFlow Inc',
    iQubeDescription: 'Real-time social media sentiment analysis for cryptocurrency markets',
    ownerType: 'Organisation',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Semi-Identifiable',
    transactionDate: '2024-12-17',
    sensitivityScore: 4,
    verifiabilityScore: 7,
    accuracyScore: 6,
    riskScore: 3,
    businessModel: 'Subscribe',
    price: 35,
    priceTo: 'Use',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-17T09:15:00Z',
    updatedAt: '2024-12-17T09:15:00Z'
  }),
  calculateCompositeScores({
    id: '4',
    iQubeName: 'Video Tutorial Collection',
    iQubeCreator: 'EduTech Studios',
    iQubeDescription: 'Comprehensive blockchain development tutorials with interactive examples',
    ownerType: 'Organisation',
    iQubeType: 'ContentQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-16',
    sensitivityScore: 2,
    verifiabilityScore: 8,
    accuracyScore: 9,
    riskScore: 2,
    businessModel: 'Rent',
    price: 15,
    priceTo: 'Use',
    durationOfRights: 'Per Week',
    publicWalletKey: '0x3f5e8d9a2b4c7e1f6a8d9c2b5e7f3a6b9c2d5e8f',
    blakQubeSchema: 'Unstructured',
    createdAt: '2024-12-16T11:45:00Z',
    updatedAt: '2024-12-16T11:45:00Z'
  }),
  calculateCompositeScores({
    id: '5',
    iQubeName: 'Smart Contract Auditor',
    iQubeCreator: 'SecureCode AI',
    iQubeDescription: 'Automated tool for detecting vulnerabilities and security issues in smart contracts',
    ownerType: 'Organisation',
    iQubeType: 'ToolQube',
    ownerIdentifiability: 'Semi-Identifiable',
    transactionDate: '2024-12-15',
    sensitivityScore: 7,
    verifiabilityScore: 9,
    accuracyScore: 8,
    riskScore: 4,
    businessModel: 'Subscribe',
    price: 75,
    priceTo: 'Use',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x9c8b7a6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f9a8b',
    blakQubeSchema: 'Access Keys',
    createdAt: '2024-12-15T16:20:00Z',
    updatedAt: '2024-12-15T16:20:00Z'
  }),
  calculateCompositeScores({
    id: '6',
    iQubeName: 'GPT-4 Finance Model',
    iQubeCreator: 'Neural Networks Corp',
    iQubeDescription: 'Fine-tuned language model specialized in financial analysis and market predictions',
    ownerType: 'Organisation',
    iQubeType: 'ModelQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-14',
    sensitivityScore: 6,
    verifiabilityScore: 8,
    accuracyScore: 9,
    riskScore: 5,
    businessModel: 'License',
    price: 120,
    priceTo: 'License',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f7e6d',
    blakQubeSchema: 'Access Keys',
    createdAt: '2024-12-14T13:10:00Z',
    updatedAt: '2024-12-14T13:10:00Z'
  }),
  calculateCompositeScores({
    id: '7',
    iQubeName: 'Web3 Analytics Dashboard',
    iQubeCreator: 'ChainInsight',
    iQubeDescription: 'Interactive dashboard displaying DeFi protocol metrics and yield farming opportunities',
    ownerType: 'Organisation',
    iQubeType: 'ToolQube',
    ownerIdentifiability: 'Semi-Identifiable',
    transactionDate: '2024-12-13',
    sensitivityScore: 3,
    verifiabilityScore: 7,
    accuracyScore: 7,
    riskScore: 3,
    businessModel: 'Subscribe',
    price: 25,
    priceTo: 'Use',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x5d4c3b2a1f9e8d7c6b5a4f3e2d1c9b8a7f6e5d4c',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-13T08:30:00Z',
    updatedAt: '2024-12-13T08:30:00Z'
  }),
  calculateCompositeScores({
    id: '8',
    iQubeName: 'Podcast Archive',
    iQubeCreator: 'CryptoTalks Media',
    iQubeDescription: 'Complete archive of cryptocurrency and blockchain technology podcast episodes',
    ownerType: 'Organisation',
    iQubeType: 'ContentQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-12',
    sensitivityScore: 1,
    verifiabilityScore: 6,
    accuracyScore: 7,
    riskScore: 1,
    businessModel: 'Buy',
    price: 45,
    priceTo: 'Purchase',
    durationOfRights: 'Forever',
    publicWalletKey: '0x2a1b9c8d7e6f5a4b3c2d1e9f8a7b6c5d4e3f2a1b',
    blakQubeSchema: 'Unstructured',
    createdAt: '2024-12-12T15:45:00Z',
    updatedAt: '2024-12-12T15:45:00Z'
  }),
  calculateCompositeScores({
    id: '9',
    iQubeName: 'Price Prediction Model',
    iQubeCreator: 'QuantumAI Research',
    iQubeDescription: 'Machine learning model for predicting cryptocurrency price movements using technical indicators',
    ownerType: 'Organisation',
    iQubeType: 'ModelQube',
    ownerIdentifiability: 'Semi-Identifiable',
    transactionDate: '2024-12-11',
    sensitivityScore: 5,
    verifiabilityScore: 8,
    accuracyScore: 7,
    riskScore: 6,
    businessModel: 'Rent',
    price: 89,
    priceTo: 'Use',
    durationOfRights: 'Per Week',
    publicWalletKey: '0x6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c8b7a6f5e',
    blakQubeSchema: 'Access Keys',
    createdAt: '2024-12-11T12:00:00Z',
    updatedAt: '2024-12-11T12:00:00Z'
  })
];

export const useIQubes = () => {
  const [iQubes, setIQubes] = useState<IQube[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const storedData = JSON.parse(stored);
      // Recalculate composite scores for existing data
      const dataWithCompositeScores = storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
      setIQubes(dataWithCompositeScores);
    } else {
      setIQubes(initialData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data: IQube[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addIQube = (iQubeData: IQubeFormData) => {
    const newIQubeWithCompositeScores = calculateCompositeScores({
      ...iQubeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const updated = [...iQubes, newIQubeWithCompositeScores];
    setIQubes(updated);
    saveToStorage(updated);
    return newIQubeWithCompositeScores;
  };

  const updateIQube = (id: string, iQubeData: Partial<IQubeFormData>) => {
    const updated = iQubes.map(iqube => {
      if (iqube.id === id) {
        const updatedIQube = { ...iqube, ...iQubeData, updatedAt: new Date().toISOString() };
        return calculateCompositeScores(updatedIQube);
      }
      return iqube;
    });
    setIQubes(updated);
    saveToStorage(updated);
  };

  const deleteIQube = (id: string) => {
    const updated = iQubes.filter(iqube => iqube.id !== id);
    setIQubes(updated);
    saveToStorage(updated);
  };

  const getAnalytics = (): AnalyticsData => {
    const totalIQubes = iQubes.length;
    const averageRiskScore = iQubes.reduce((sum, iqube) => sum + iqube.riskScore, 0) / totalIQubes || 0;
    const averagePrice = iQubes.reduce((sum, iqube) => sum + iqube.price, 0) / totalIQubes || 0;

    const typeCounts = iQubes.reduce((acc, iqube) => {
      acc[iqube.iQubeType] = (acc[iqube.iQubeType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularTypes = Object.entries(typeCounts).map(([type, count]) => ({ type, count }));

    const businessModelCounts = iQubes.reduce((acc, iqube) => {
      acc[iqube.businessModel] = (acc[iqube.businessModel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const businessModelDistribution = Object.entries(businessModelCounts).map(([model, count]) => ({ model, count }));

    // Mock monthly data for demo
    const monthlyTransactions = [
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 19 },
      { month: 'Mar', count: 15 },
      { month: 'Apr', count: 22 },
      { month: 'May', count: 28 },
      { month: 'Jun', count: 35 }
    ];

    return {
      totalIQubes,
      averageRiskScore: Math.round(averageRiskScore * 10) / 10,
      averagePrice: Math.round(averagePrice * 100) / 100,
      popularTypes,
      businessModelDistribution,
      monthlyTransactions
    };
  };

  return {
    iQubes,
    loading,
    addIQube,
    updateIQube,
    deleteIQube,
    getAnalytics
  };
};
