import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Badge } from '../../../../types/badge';

interface RecentAchievementsProps {
  badges: Badge[];
}

export const RecentAchievements: React.FC<RecentAchievementsProps> = ({ badges }) => {
  const recentBadges = badges
    .filter(badge => badge.unlockedAt)
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 3);

  if (recentBadges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <div className="flex items-center mb-4">
        <Award className="w-6 h-6 text-fjs-gold mr-2" />
        <h3 className="text-lg font-semibold text-white">Recent Achievements</h3>
      </div>

      <div className="space-y-4">
        {recentBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center p-3 bg-black/20 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-xl">{badge.icon}</span>
            </div>
            <div className="ml-3 flex-1">
              <h4 className="font-medium text-white">{badge.name}</h4>
              <p className="text-sm text-fjs-silver">{badge.description}</p>
            </div>
            {badge.unlockedAt && (
              <span className="text-xs text-fjs-silver">
                {badge.unlockedAt.toLocaleDateString()}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};