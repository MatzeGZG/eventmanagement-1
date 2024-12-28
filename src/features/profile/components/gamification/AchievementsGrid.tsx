import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, Calendar } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { useAchievements } from '../../hooks/useAchievements';

export const AchievementsGrid: React.FC = () => {
  const { achievements, loading } = useAchievements();

  if (loading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AchievementCard
        title="Social Butterfly"
        description="Connect with other members"
        progress={achievements.connections}
        total={100}
        icon={<Users className="w-5 h-5" />}
        unlocked={achievements.connections >= 100}
      />
      
      <AchievementCard
        title="Event Explorer"
        description="Attend different types of events"
        progress={achievements.eventsAttended}
        total={50}
        icon={<Calendar className="w-5 h-5" />}
        unlocked={achievements.eventsAttended >= 50}
      />
      
      <AchievementCard
        title="Rising Star"
        description="Earn reputation points"
        progress={achievements.reputation}
        total={1000}
        icon={<Star className="w-5 h-5" />}
        unlocked={achievements.reputation >= 1000}
      />
      
      <AchievementCard
        title="Elite Status"
        description="Reach the highest membership tier"
        progress={achievements.level}
        total={5}
        icon={<Trophy className="w-5 h-5" />}
        unlocked={achievements.level >= 5}
      />
    </div>
  );
};