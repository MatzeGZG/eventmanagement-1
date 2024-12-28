import React from 'react';
import { motion } from 'framer-motion';
import { LevelProgressCard } from './gamification/LevelProgressCard';
import { RecentAchievements } from './gamification/RecentAchievements';
import { GamificationStats } from './gamification/GamificationStats';
import { AchievementsGrid } from './gamification/AchievementsGrid';
import { NextLevelProgress } from './gamification/NextLevelProgress';
import { useStore } from '../../../store';

export const ProfileGamification: React.FC = () => {
  const user = useStore(state => state.user);

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <GamificationStats />

      {/* Level Progress and Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LevelProgressCard />
        <RecentAchievements badges={user.badges} />
      </div>

      {/* Next Level Preview */}
      <NextLevelProgress />

      {/* All Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-fjs-charcoal rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-fjs-gold mb-4">Achievements</h3>
        <AchievementsGrid />
      </motion.div>
    </div>
  );
};