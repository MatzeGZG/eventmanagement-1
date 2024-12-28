import React from 'react';
import { Calendar } from 'lucide-react';
import { ChallengeProgress } from './ChallengeProgress';

interface DailyChallengeProps {
  challenge: {
    title: string;
    description: string;
    reward: number;
    progress: number;
    total: number;
  };
  onComplete?: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ challenge, onComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{challenge.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
          <ChallengeProgress
            progress={challenge.progress}
            total={challenge.total}
            reward={challenge.reward}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
};