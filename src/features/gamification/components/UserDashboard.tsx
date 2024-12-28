import React from 'react';
import { useStore } from '../../../store';
import { LevelProgress } from './LevelProgress';
import { ChallengeList } from './ChallengeList';
import { PointsHistory } from './PointsHistory';
import { BadgeCollection } from './BadgeCollection';
import { useGamification } from '../hooks/useGamification';
import { useMembership } from '../../membership/hooks/useMembership';

export const UserDashboard: React.FC = () => {
  const user = useStore(state => state.user);
  const { getNextLevelProgress } = useGamification();
  const { getCurrentTier, getTierBenefits } = useMembership();

  if (!user) return null;

  const { currentXP, nextLevelXP, progress } = getNextLevelProgress();
  const currentTier = getCurrentTier();
  const benefits = getTierBenefits(currentTier);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level Progress and Membership */}
        <div className="lg:col-span-2 space-y-6">
          <LevelProgress
            level={user.level}
            xp={currentXP}
            nextLevelXP={nextLevelXP}
          />
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentTier} Member Benefits
            </h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <ChallengeList />
        </div>

        {/* Points and Badges */}
        <div className="space-y-6">
          <PointsHistory />
          <BadgeCollection badges={user.badges} />
        </div>
      </div>
    </div>
  );
};