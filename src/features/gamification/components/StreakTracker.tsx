import React from 'react';
import { Flame } from 'lucide-react';
import { STREAK_BONUSES } from '../constants';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak
}) => {
  const getStreakBonus = () => {
    if (currentStreak >= 30) return STREAK_BONUSES.THIRTY_DAY;
    if (currentStreak >= 7) return STREAK_BONUSES.SEVEN_DAY;
    if (currentStreak >= 5) return STREAK_BONUSES.FIVE_DAY;
    if (currentStreak >= 3) return STREAK_BONUSES.THREE_DAY;
    return 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Flame className="w-5 h-5 text-orange-500 mr-2" />
          <span className="text-lg font-semibold text-gray-900">
            {currentStreak} Day Streak
          </span>
        </div>
        {getStreakBonus() > 0 && (
          <div className="bg-orange-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-orange-600">
              +{getStreakBonus()} bonus
            </span>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Longest streak: {longestStreak} days
      </div>
    </div>
  );
};