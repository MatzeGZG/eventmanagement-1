import React from 'react';
import { Trophy } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: string;
}

export const XPBar: React.FC<XPBarProps> = ({ currentXP, nextLevelXP, level }) => {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-indigo-600 mr-2" />
          <span className="font-medium text-gray-900">{level}</span>
        </div>
        <span className="text-sm text-gray-600">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};