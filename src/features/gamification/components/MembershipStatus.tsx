import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { useMembership } from '../hooks/useMembership';
import { usePoints } from '../hooks/usePoints';

export const MembershipStatus: React.FC = () => {
  const { getCurrentTier, getPointsToNextTier, getTierBenefits } = useMembership();
  const { currentPoints, pointMultiplier } = usePoints();

  const currentTier = getCurrentTier();
  const pointsToNext = getPointsToNextTier();
  const benefits = getTierBenefits();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-indigo-600 mr-2" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {currentTier.tier} Member
            </h3>
            <p className="text-sm text-gray-600">
              {pointsToNext > 0
                ? `${pointsToNext} points to next tier`
                : 'Maximum tier reached'}
            </p>
          </div>
        </div>
        <div className="bg-indigo-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-indigo-600">
            {pointMultiplier}x Points
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to Next Tier</span>
            <span>{currentPoints} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentPoints / (currentPoints + pointsToNext)) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Current Benefits</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <ChevronRight className="w-4 h-4 text-indigo-600 mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};