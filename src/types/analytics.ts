
export interface AnalyticsData {
  totalIQubes: number;
  averageRiskScore: number;
  averagePrice: number;
  popularTypes: Array<{ type: string; count: number }>;
  businessModelDistribution: Array<{ model: string; count: number }>;
  monthlyTransactions: Array<{ month: string; count: number }>;
}
