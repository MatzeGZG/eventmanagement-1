```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

export const AnalyticsDashboard: React.FC = () => {
  const { metrics, loading } = useAnalytics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={DollarSign}
          label="Revenue"
          value={metrics.revenue}
          trend={metrics.revenueTrend}
        />
        <MetricCard
          icon={Users}
          label="Conversions"
          value={metrics.conversions}
          trend={metrics.conversionTrend}
        />
        <MetricCard
          icon={TrendingUp}
          label="Engagement"
          value={metrics.engagement}
          trend={metrics.engagementTrend}
        />
        <MetricCard
          icon={BarChart2}
          label="Sales"
          value={metrics.sales}
          trend={metrics.salesTrend}
        />
      </div>

      {/* Add charts and detailed analytics */}
    </div>
  );
};

interface MetricCardProps {
  icon: React.FC<any>;
  label: string;
  value: number | string;
  trend: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  trend
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-fjs-charcoal rounded-xl p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <Icon className="w-6 h-6 text-fjs-gold" />
      <div className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-sm text-fjs-silver">{label}</p>
    </div>
  </motion.div>
);
```