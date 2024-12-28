```typescript
import React from 'react';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { usePoints } from '../hooks/usePoints';
import { STREAK_BONUSES } from '../constants/points';

export const PointsOverview: React.FC = () => {
  const { currentPoints, pointMultiplier, currentStreak } = usePoints();

  const getStreakBonus = () => {
    if (currentStreak >= 30) return STREAK_BONUSES.THIRTY_DAY;
    if (currentStreak >= 7) return STREAK_BONUSES.SEVEN_DAY;
    if (currentStreak >= 5) return STREAK_BONUSES.FIVE_DAY;
    if (currentStreak >= 3) return STREAK_BONUSES.THREE_DAY;
    return 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-indigo-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Points Balance</h3>
            <p className="text-sm text-gray-600">Keep earning to unlock more benefits</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">{currentPoints}</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Points Multiplier</span>
          </div>
          <span className="text-sm font-medium text-green-600">{pointMultiplier}x</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-orange-500 mr-2" />
            <div>
              <span className="text-sm font-medium text-gray-700">Activity Streak</span>
              <p className="text-xs text-gray-500">{currentStreak} days</p>
            </div>
          </div>
          {getStreakBonus() > 0 && (
            <span className="text-sm font-medium text-orange-600">
              +{getStreakBonus()} bonus
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
```