import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { useGamification } from '../../../../hooks/useGamification';

export const LevelProgressCard: React.FC = () => {
  const { currentLevel, nextLevel, progress } = useGamification();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-fjs-gold mr-2" />
          <div>
            <h3 className="text-lg font-semibold text-white">{currentLevel.level}</h3>
            <p className="text-sm text-fjs-silver">
              {progress.current.toLocaleString()} / {progress.next.toLocaleString()} XP
            </p>
          </div>
        </div>
        {nextLevel && (
          <div className="flex items-center text-fjs-gold">
            <span className="text-sm font-medium mr-1">Next: {nextLevel.level}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="relative h-2 bg-black rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          className="absolute h-full bg-gradient-gold"
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-fjs-silver">Current Benefits:</h4>
        <ul className="space-y-1">
          {currentLevel.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-sm text-white">
              <span className="w-1.5 h-1.5 bg-fjs-gold rounded-full mr-2" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};