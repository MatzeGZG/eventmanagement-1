import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { useStore } from '../../../../store';

export const GamificationStats: React.FC = () => {
  const user = useStore(state => state.user);
  
  const stats = [
    { icon: Trophy, label: 'Level', value: user?.level || 'New Explorer' },
    { icon: Star, label: 'XP', value: user?.xp.toLocaleString() || '0' },
    { icon: Award, label: 'Badges', value: user?.badges.length || 0 },
    { icon: Zap, label: 'Streak', value: user?.currentStreak || 0 }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-fjs-charcoal rounded-xl p-4 hover:shadow-gold transition-all"
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