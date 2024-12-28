import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Badge } from '../../../types/badge';

interface AchievementUnlockProps {
  badge: Badge;
  onClose: () => void;
}

export const AchievementUnlock: React.FC<AchievementUnlockProps> = ({ badge, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-6 max-w-sm shadow-xl border border-fjs-gold z-50"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-gold p-0.5">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Trophy className="w-8 h-8 text-fjs-gold" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-fjs-gold">Achievement Unlocked!</h3>
            <p className="text-white font-medium">{badge.name}</p>
            <p className="text-sm text-fjs-silver">{badge.description}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
        >
          Claim Reward
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};