```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Star } from 'lucide-react';
import { User } from '../../../types/user';

interface ProfileStatsProps {
  user: User;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => {
  const stats = [
    { icon: Award, label: 'Level', value: user.level },
    { icon: Star, label: 'XP', value: user.xp.toLocaleString() },
    { icon: Users, label: 'Connections', value: user.connections.length },
    { icon: Calendar, label: 'Events Attended', value: user.eventsAttended || 0 }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-fjs-charcoal rounded-lg p-4 hover:shadow-gold transition-all"
        >
          <div className="flex items-center space-x-3">
            <stat.icon className="w-8 h-8 text-fjs-gold" />
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-fjs-silver">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```