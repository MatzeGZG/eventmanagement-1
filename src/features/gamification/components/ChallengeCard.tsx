import React from 'react';
import { Trophy } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  onClaim?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  reward,
  progress,
  total,
  onClaim
}) => {
  const isComplete = progress >= total;
  const progressPercentage = Math.min((progress / total) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
          <Trophy className="w-4 h-4 text-indigo-600 mr-1" />
          <span className="text-sm font-medium text-indigo-600">+{reward} XP</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {isComplete && onClaim && (
        <button
          onClick={onClaim}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Claim Reward
        </button>
      )}
    </div>
  );
};