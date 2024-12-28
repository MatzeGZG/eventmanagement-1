import React from 'react';
import { Users, Calendar, Image, TrendingUp } from 'lucide-react';
import { useAdminStats } from '../../hooks/useAdminStats';
import { StatCard } from './StatCard';

export const AdminStats: React.FC = () => {
  const { stats, loading } = useAdminStats();

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Users className="w-6 h-6" />}
        label="Total Users"
        value={stats.totalUsers}
        trend={stats.userGrowth}
      />
      <StatCard
        icon={<Calendar className="w-6 h-6" />}
        label="Active Events"
        value={stats.activeEvents}
        trend={stats.eventGrowth}
      />
      <StatCard
        icon={<Image className="w-6 h-6" />}
        label="Media Items"
        value={stats.mediaItems}
        trend={stats.mediaGrowth}
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Platform Growth"
        value={`${stats.platformGrowth}%`}
        trend={stats.platformGrowth}
      />
    </div>
  );
};