import React from 'react';
import { Trophy } from 'lucide-react';

interface ChallengeProgressProps {
  progress: number;
  total: number;
  reward: number;
  onComplete?: () => void;
}

export const ChallengeProgress: React.FC<ChallengeProgressProps> = ({
  progress,
  total,
  reward,
  onComplete
}) => {
  const percentage = (progress / total) * 100;
  const isComplete = progress >= total;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">
          {progress} / {total} completed
        </div>
        <div className="flex items-center bg-indigo-100 px-2 py-1 rounded-full">
          <Trophy className="w-4 h-4 text-indigo-600 mr-1" />
          <span className="text-sm font-medium text-indigo-600">+{reward} XP</span>
        </div>
      </div>
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isComplete ? 'bg-green-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isComplete && onComplete && (
          <button
            onClick={onComplete}
            className="absolute right-0 -top-8 text-sm text-green-600 hover:text-green-700"
          >
            Claim Reward
          </button>
        )}
      </div>
    </div>
  );
};