import React from 'react';
import { Trophy } from 'lucide-react';
import { useStore } from '../../../store';
import { LEVEL_REQUIREMENTS } from '../constants';

export const LevelProgress: React.FC = () => {
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
          <Trophy className="w-6 h-6 text-fjs-gold mr-2" />
          <div>
            <h3 className="text-fjs-gold font-semibold">{level}</h3>
            <p className="text-sm text-fjs-silver">
              {nextLevel ? `${nextLevel.minXP - xp} XP to next level` : 'Max level'}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-fjs-charcoal rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-fjs-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};