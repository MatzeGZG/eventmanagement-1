import React from 'react';
import { Trophy, Star, X } from 'lucide-react';

interface RewardNotificationProps {
  type: 'xp' | 'points' | 'badge';
  amount?: number;
  message: string;
  onClose: () => void;
}

export const RewardNotification: React.FC<RewardNotificationProps> = ({
  type,
  amount,
  message,
  onClose
}) => {
  const icons = {
    xp: <Trophy className="w-5 h-5 text-indigo-600" />,
    points: <Star className="w-5 h-5 text-yellow-500" />,
    badge: <Award className="w-5 h-5 text-purple-600" />
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {amount && `+${amount} `}{message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};