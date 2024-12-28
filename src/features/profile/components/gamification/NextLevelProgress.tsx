import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useGamification } from '../../../../hooks/useGamification';

export const NextLevelProgress: React.FC = () => {
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
          <h3 className="text-lg font-semibold text-white">Next Level</h3>
        </div>
        <span className="text-fjs-silver">
          {progress.current} / {progress.next} XP
        </span>
      </div>

      <div className="relative h-2 bg-black rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          className="absolute h-full bg-gradient-gold"
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {nextLevel && (
        <div className="text-sm text-fjs-silver">
          <span className="text-fjs-gold font-medium">{nextLevel.level}</span>
          {" unlocks: "}
          {nextLevel.benefits[0]}
        </div>
      )}
    </motion.div>
  );
};