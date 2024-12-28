```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Star, TrendingUp } from 'lucide-react';
import { SocialEngagement } from '../../types/enhanced';

interface SocialEngagementCardProps {
  metrics: SocialEngagement;
}

export const SocialEngagementCard: React.FC<SocialEngagementCardProps> = ({ metrics }) => {
  const stats = [
    {
      icon: Users,
      label: 'Event Attendance',
      value: `${(metrics.eventAttendanceRate * 100).toFixed(0)}%`,
      color: 'text-green-500'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: `${metrics.responseTime}m`,
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      label: 'Activity Level',
      value: `${metrics.connectionActivity}`,
      color: 'text-purple-500'
    },
    {
      icon: Star,
      label: 'Community Rating',
      value: `${metrics.communityRating.toFixed(1)}`,
      color: 'text-yellow-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-fjs-gold mb-4">Social Engagement</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <div>
                <div className="text-sm text-fjs-silver">{label}</div>
                <div className="text-lg font-semibold text-white">{value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
```