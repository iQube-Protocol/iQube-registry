
import { IQube } from '@/types/iQube';
import { AnalyticsData } from '@/types/analytics';

export const calculateAnalytics = (iQubes: IQube[]): AnalyticsData => {
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
