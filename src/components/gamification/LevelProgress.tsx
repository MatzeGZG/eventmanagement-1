import React from 'react';
import { Trophy } from 'lucide-react';
import { useStore } from '../../store';
import { colors } from '../../styles/colors';
import { LEVEL_REQUIREMENTS } from '../../features/gamification/constants';

export const LevelProgress = () => {
  const { level, xp } = useStore();
  
  const currentLevel = LEVEL_REQUIREMENTS.find(req => req.level === level);
  const nextLevel = LEVEL_REQUIREMENTS[LEVEL_REQUIREMENTS.indexOf(currentLevel!) + 1];
  
  const progress = nextLevel 
    ? ((xp - currentLevel!.minXP) / (nextLevel.minXP - currentLevel!.minXP)) * 100
    : 100;

  return (
    <div className="bg-black rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-[#D4AF37] mr-2" />
          <div>
            <h3 className="text-[#D4AF37] font-semibold">{level}</h3>
            <p className="text-sm text-[#C0C0C0]">
              {nextLevel ? `${nextLevel.minXP - xp} XP to next level` : 'Max level'}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-[#2C2C2C] rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-[#D4AF37] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};