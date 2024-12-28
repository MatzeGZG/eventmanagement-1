```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Tag } from 'lucide-react';
import { useEventAnalytics } from '../../hooks/useEventAnalytics';

interface EventAnalyticsProps {
  eventId: string;
}

export const EventAnalytics: React.FC<EventAnalyticsProps> = ({ eventId }) => {
  const { analytics, loading } = useEventAnalytics(eventId);

  if (loading || !analytics) {
    return (
      <div className="text-center text-fjs-silver">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trending Score */}
      <div className="bg-fjs-charcoal rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-fjs-gold mr-2" />
            <h3 className="text-lg font-semibold text-white">Trending Score</h3>
          </div>
          <div className="text-2xl font-bold text-fjs-gold">
            {Math.round(analytics.trendingScore * 100)}%
          </div>
        </div>
        <div className="h-2 bg-black rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analytics.trendingScore * 100}%` }}
            className="h-full bg-gradient-gold"
          />
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-fjs-charcoal rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Users className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-white">Attendance Rate</h3>
        </div>
        <div className="text-2xl font-bold text-fjs-gold mb-2">
          {Math.round(analytics.attendanceRate * 100)}%
        </div>
        <div className="h-2 bg-black rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analytics.attendanceRate * 100}%` }}
            className="h-full bg-gradient-gold"
          />
        </div>
      </div>

      {/* Peak Times */}
      <div className="bg-fjs-charcoal rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-white">Peak Times</h3>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {Object.entries(analytics.peakTimes).map(([hour, count]) => (
            <div key={hour} className="text-center">
              <div className="h-20 relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(count / Math.max(...Object.values(analytics.peakTimes))) * 100}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-fjs-gold/20 rounded-t"
                />
              </div>
              <div className="text-xs text-fjs-silver mt-1">
                {hour}:00
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-fjs-charcoal rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-white">Popular Categories</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(analytics.popularCategories)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} className="flex items-center">
                <div className="flex-1 text-fjs-silver">{category}</div>
                <div className="w-32 h-2 bg-black rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / Math.max(...Object.values(analytics.popularCategories))) * 100}%` }}
                    className="h-full bg-gradient-gold"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
```