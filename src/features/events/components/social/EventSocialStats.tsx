```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Users } from 'lucide-react';
import { Event } from '../../../../types/event';
import { useEventAnalytics } from '../../hooks/useEventAnalytics';

interface EventSocialStatsProps {
  event: Event;
}

export const EventSocialStats: React.FC<EventSocialStatsProps> = ({ event }) => {
  const { analytics } = useEventAnalytics(event.id);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={Users}
        label="Attendees"
        value={`${event.attendees.length}/${event.capacity}`}
        percentage={analytics?.attendanceRate ? analytics.attendanceRate * 100 : 0}
      />
      <StatCard
        icon={Heart}
        label="Likes"
        value={event.likes?.toString() || '0'}
      />
      <StatCard
        icon={MessageCircle}
        label="Comments"
        value={event.comments?.toString() || '0'}
      />
      <StatCard
        icon={Share2}
        label="Shares"
        value={event.shares?.toString() || '0'}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<any>;
  label: string;
  value: string;
  percentage?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  percentage
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-fjs-charcoal rounded-lg p-4"
  >
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-5 h-5 text-fjs-gold" />
      <span className="text-sm text-fjs-silver">{label}</span>
    </div>
    <div className="text-xl font-bold text-white">
      {value}
    </div>
    {percentage !== undefined && (
      <div className="mt-2">
        <div className="h-1 bg-black rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-gradient-gold"
          />
        </div>
        <div className="text-xs text-fjs-silver mt-1">
          {percentage.toFixed(1)}% full
        </div>
      </div>
    )}
  </motion.div>
);
```