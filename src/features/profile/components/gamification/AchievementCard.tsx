import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface AchievementProps {
  title: string;
  description: string;
  progress: number;
  total: number;
  icon?: React.ReactNode;
  unlocked?: boolean;
}

export const AchievementCard: React.FC<AchievementProps> = ({
  title,
  description,
  progress,
  total,
  icon = <Trophy />,
  unlocked = false
}) => {
  const percentage = (progress / total) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-fjs-charcoal rounded-xl p-4 ${
        unlocked ? 'ring-2 ring-fjs-gold' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${
          unlocked ? 'bg-fjs-gold text-black' : 'bg-black/30 text-fjs-gold'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-fjs-silver mb-3">{description}</p>
          
          <div className="relative h-2 bg-black rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={`absolute h-full ${
                unlocked ? 'bg-fjs-gold' : 'bg-fjs-gold/50'
              }`}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="mt-1 text-right text-xs text-fjs-silver">
            {progress} / {total}
          </div>
        </div>
      </div>
    </motion.div>
  );
};