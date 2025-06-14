
import { useState, useEffect } from 'react';
import { IQube, IQubeFormData, AnalyticsData } from '@/types/iQube';

const STORAGE_KEY = 'iqubes-registry';

// Sample data to start with
const initialData: IQube[] = [
  {
    id: '1',
    iQubeName: 'Qrypto Profile',
    iQubeCreator: 'Aigent Z',
    iQubeDescription: 'Personal profile detailing Crypto wallets, social handles, and web 3 interests',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Semi-Anonymous',
    transactionDate: '2024-12-19',
    sensitivityScore: 6,
    verifiabilityScore: 5,
    accuracyScore: 5,
    riskScore: 6,
    businessModel: 'Buy',
    price: 20, // 20 cents = $0.20
    priceTo: 'Sell',
    durationOfRights: 'Forever',
    publicWalletKey: '0x742d35Cc6532C4532f5ccC1b1f94396aAbc4532e',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-19T10:00:00Z',
    updatedAt: '2024-12-19T10:00:00Z'
  },
  {
    id: '2',
    iQubeName: 'AI Trading Bot',
    iQubeCreator: 'CryptoMind Labs',
    iQubeDescription: 'Advanced trading algorithm for DeFi protocols with risk management capabilities',
    ownerType: 'Organisation',
    iQubeType: 'AigentQube',
    ownerIdentifiability: 'Identifiable',
    transactionDate: '2024-12-18',
    sensitivityScore: 8,
    verifiabilityScore: 9,
    accuracyScore: 8,
    riskScore: 7,
    businessModel: 'License',
    price: 85, // 85 cents = $0.85
    priceTo: 'License',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x8f4A9b2c1d5e8f3a6b9c2d5e8f3a6b9c2d5e8f3a',
    blakQubeSchema: 'Access Keys',
    createdAt: '2024-12-18T14:30:00Z',
    updatedAt: '2024-12-18T14:30:00Z'
  },
  {
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
    price: 65, // 65 cents = $0.65
    priceTo: 'Use',
    durationOfRights: 'Per Month',
    publicWalletKey: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    blakQubeSchema: 'Structured',
    createdAt: '2024-12-17T09:15:00Z',
    updatedAt: '2024-12-17T09:15:00Z'
  }
];

export const useIQubes = () => {
  const [iQubes, setIQubes] = useState<IQube[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIQubes(JSON.parse(stored));
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
    const newIQube: IQube = {
      ...iQubeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [...iQubes, newIQube];
    setIQubes(updated);
    saveToStorage(updated);
    return newIQube;
  };

  const updateIQube = (id: string, iQubeData: Partial<IQubeFormData>) => {
    const updated = iQubes.map(iqube => 
      iqube.id === id 
        ? { ...iqube, ...iQubeData, updatedAt: new Date().toISOString() }
        : iqube
    );
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
