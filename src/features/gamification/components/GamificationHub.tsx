import React from 'react';
import { useStore } from '../../../store';
import { LevelProgress } from './progress/LevelProgress';
import { PointsOverview } from './points/PointsOverview';
import { ChallengeList } from './challenges/ChallengeList';
import { BadgeCollection } from './badges/BadgeCollection';
import { MembershipStatus } from './membership/MembershipStatus';
import { StreakTracker } from './streaks/StreakTracker';
import { usePoints } from '../hooks/usePoints';

export const GamificationHub: React.FC = () => {
  const user = useStore(state => state.user);
  const { currentPoints, pointMultiplier, currentStreak } = usePoints();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MembershipStatus />
        <LevelProgress currentXP={user.xp} level={user.level} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PointsOverview />
        <StreakTracker currentStreak={currentStreak} longestStreak={user.longestStreak || 0} />
      </div>

      <div className="mb-6">
        <ChallengeList />
      </div>

      <div>
        <BadgeCollection badges={user.badges} />
      </div>
    </div>
  );
};