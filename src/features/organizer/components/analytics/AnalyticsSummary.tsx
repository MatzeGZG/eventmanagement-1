import React from 'react';
import { Users, Star, TrendingUp, Award } from 'lucide-react';
import { OrganizerStats, AttendeeAnalytics } from '../../types';
import { DemographicsChart } from './DemographicsChart';
import { EngagementMetrics } from './EngagementMetrics';
import { TrendAnalysis } from './TrendAnalysis';

interface AnalyticsSummaryProps {
  stats: OrganizerStats;
  analytics: AttendeeAnalytics;
}

export const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  stats,
  analytics
}) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Total Attendees"
          value={stats.totalAttendees}
        />
        <StatCard
          icon={<Star className="w-6 h-6" />}
          label="Average Rating"
          value={`${stats.averageRating.toFixed(1)}/5.0`}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Success Rate"
          value={`${(stats.successRate * 100).toFixed(1)}%`}
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Points Earned"
          value={stats.pointsEarned}
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemographicsChart data={analytics.demographics} />
        <EngagementMetrics data={analytics.engagement} />
        <TrendAnalysis data={analytics.trends} />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div className="text-indigo-600">{icon}</div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  </div>
);