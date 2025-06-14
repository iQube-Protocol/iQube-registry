
import { useIQubes } from '@/hooks/useIQubes';
import { StatCard } from '@/components/ui/StatCard';
import { Database, DollarSign, TrendingUp, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

export const Analytics = () => {
  const { getAnalytics } = useIQubes();
  const analytics = getAnalytics();

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex-none bg-slate-50 border-b border-slate-200">
        <div className="p-8 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-1">
            Insights and performance metrics for your iQube registry
          </p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="p-8 pt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total iQubes"
                value={analytics.totalIQubes}
                icon={Database}
                change={{ value: 12.5, type: 'increase' }}
              />
              <StatCard
                title="Average Price"
                value={`$${analytics.averagePrice.toFixed(2)}`}
                icon={DollarSign}
                change={{ value: 8.2, type: 'increase' }}
              />
              <StatCard
                title="Average Risk Score"
                value={analytics.averageRiskScore}
                icon={Shield}
                change={{ value: 2.1, type: 'decrease' }}
              />
              <StatCard
                title="Growth Rate"
                value="23.8%"
                icon={TrendingUp}
                change={{ value: 15.3, type: 'increase' }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* iQube Types Distribution */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">iQube Types Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.popularTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.popularTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Business Model Distribution */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Models</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.businessModelDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Transactions */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Transaction Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.monthlyTransactions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Additional Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Most Popular Type</h4>
                <p className="text-2xl font-bold">
                  {analytics.popularTypes[0]?.type || 'N/A'}
                </p>
                <p className="text-blue-100 text-sm">
                  {analytics.popularTypes[0]?.count || 0} iQubes
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Lowest Risk Average</h4>
                <p className="text-2xl font-bold">
                  {analytics.averageRiskScore}/10
                </p>
                <p className="text-green-100 text-sm">
                  Excellent security profile
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Total Value</h4>
                <p className="text-2xl font-bold">
                  ${(analytics.averagePrice * analytics.totalIQubes).toFixed(2)}
                </p>
                <p className="text-purple-100 text-sm">
                  Combined registry value
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
