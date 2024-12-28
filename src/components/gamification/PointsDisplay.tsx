import React from 'react';
import { Award } from 'lucide-react';
import { useStore } from '../../store';
import { colors } from '../../styles/colors';

export const PointsDisplay = () => {
  const { points, level } = useStore();

  return (
    <div className="flex items-center space-x-2 bg-black rounded-lg px-4 py-2">
      <Award className={`w-5 h-5 text-[${colors.primary.gold}]`} />
      <div className="flex flex-col">
        <span className={`text-sm font-medium text-[${colors.primary.gold}]`}>
          {points} points
        </span>
        <span className={`text-xs text-[${colors.primary.lightGold}]`}>
          Level {level}
        </span>
      </div>
    </div>
  );
};