import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { usePointSystem } from '../hooks/usePointSystem';
import { useMembership } from '../../membership/hooks/useMembership';

export const PointsSummary: React.FC = () => {
  const { currentPoints, pointMultiplier } = usePointSystem();
  const { getCurrentTier, getPointsToNextTier } = useMembership();

  const currentTier = getCurrentTier();
  const pointsToNext = getPointsToNextTier();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{currentPoints}</h3>
          <p className="text-sm text-gray-600">Total Points</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Award className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-700">Point Multiplier</span>
          </div>
          <span className="text-sm font-medium text-green-600">
            {pointMultiplier}x
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{currentTier}</span>
            <span>{pointsToNext} points to next tier</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentPoints / (currentPoints + pointsToNext)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};