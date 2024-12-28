import React from 'react';
import { Clock } from 'lucide-react';
import { SpendingOption } from '../../types/points';
import { useOrganizerPoints } from '../../hooks/useOrganizerPoints';

interface PointsSpendingCardProps {
  option: SpendingOption;
  onPurchase: () => void;
}

export const PointsSpendingCard: React.FC<PointsSpendingCardProps> = ({
  option,
  onPurchase
}) => {
  const { canAffordSpending } = useOrganizerPoints();
  const canAfford = canAffordSpending(option.type);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{option.icon}</div>
        <div className="bg-indigo-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-indigo-600">
            {option.cost} points
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {option.type.split('_').map(word => 
          word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ')}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {option.description}
      </p>

      {option.duration && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>Duration: {option.duration} days</span>
        </div>
      )}

      <button
        onClick={onPurchase}
        disabled={!canAfford}
        className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          canAfford
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {canAfford ? 'Purchase' : 'Insufficient Points'}
      </button>
    </div>
  );
};