import React from 'react';
import { Award } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  multiplier?: number;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({ points, multiplier }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-indigo-600 mr-2" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{points}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
        </div>
        {multiplier && multiplier > 1 && (
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-green-600">
              {multiplier}x Multiplier
            </span>
          </div>
        )}
      </div>
    </div>
  );
};