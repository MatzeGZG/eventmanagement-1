import React from 'react';
import { Award } from 'lucide-react';
import { SPENDING_OPTIONS } from '../../types/points';
import { PointsSpendingCard } from './PointsSpendingCard';
import { useOrganizerPoints } from '../../hooks/useOrganizerPoints';

export const PointsSpendingSection: React.FC = () => {
  const { points, spendPoints } = useOrganizerPoints();

  const handlePurchase = (type: string) => {
    if (spendPoints(type as any)) {
      // Show success notification
      console.log('Purchase successful');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Points & Boosts
        </h2>
        <div className="flex items-center bg-indigo-100 px-4 py-2 rounded-full">
          <Award className="w-5 h-5 text-indigo-600 mr-2" />
          <span className="font-medium text-indigo-600">{points} points</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPENDING_OPTIONS.map(option => (
          <PointsSpendingCard
            key={option.type}
            option={option}
            onPurchase={() => handlePurchase(option.type)}
          />
        ))}
      </div>
    </div>
  );
};