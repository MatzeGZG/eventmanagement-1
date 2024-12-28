import React from 'react';
import { useAPIStats } from '../../hooks/useAPIStats';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const APIStats: React.FC = () => {
  const { stats, loading } = useAPIStats();

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Activity className="w-6 h-6" />}
        label="Total Requests"
        value={stats.totalRequests.toLocaleString()}
        subtext={`${stats.requestsPerSecond} req/s`}
      />
      <StatCard
        icon={<CheckCircle className="w-6 h-6" />}
        label="Success Rate"
        value={`${stats.successRate}%`}
        subtext="Last 24 hours"
      />
      <StatCard
        icon={<AlertTriangle className="w-6 h-6" />}
        label="Error Rate"
        value={`${stats.errorRate}%`}
        subtext={`${stats.totalErrors} errors`}
        alert={stats.errorRate > 5}
      />
      <StatCard
        icon={<Clock className="w-6 h-6" />}
        label="Avg Response Time"
        value={`${stats.avgResponseTime}ms`}
        subtext="Last 5 minutes"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  alert
}) => (
  <div className="bg-fjs-charcoal rounded-xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${
        alert ? 'bg-red-400/10 text-red-400' : 'bg-black/30 text-fjs-gold'
      }`}>
        {icon}
      </div>
    </div>
    <div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-fjs-silver">{label}</div>
      <div className="text-xs text-fjs-silver mt-1">{subtext}</div>
    </div>
  </div>
);