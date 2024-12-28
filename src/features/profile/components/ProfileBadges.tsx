```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../../types/badge';
import { Tooltip } from '../../../components/common/Tooltip';

interface ProfileBadgesProps {
  badges: Badge[];
}

export const ProfileBadges: React.FC<ProfileBadgesProps> = ({ badges }) => {
  return (
    <motion.div
      className="bg-fjs-charcoal rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-fjs-gold mb-4">Achievements</h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Tooltip content={`${badge.name} - ${badge.description}`}>
              <div className="group relative">
                <div className={`
                  w-16 h-16 rounded-full bg-gradient-to-br p-0.5
                  ${getBadgeTierStyles(badge.tier)}
                `}>
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-fjs-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Tooltip>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const getBadgeTierStyles = (tier: string) => {
  switch (tier) {
    case 'Gold':
      return 'from-yellow-400 to-yellow-600';
    case 'Silver':
      return 'from-gray-300 to-gray-500';
    default:
      return 'from-orange-400 to-orange-600';
  }
};
```