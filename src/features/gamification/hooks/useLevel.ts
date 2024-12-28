import { useCallback } from 'react';
import { useStore } from '../../../store';
import { LEVEL_REQUIREMENTS } from '../constants/levels';

export const useLevel = () => {
  const { xp } = useStore();

  const getCurrentLevel = useCallback(() => {
    return LEVEL_REQUIREMENTS.find(
      req => xp >= req.minXP && xp <= req.maxXP
    ) || LEVEL_REQUIREMENTS[0];
  }, [xp]);

  const getNextLevel = useCallback(() => {
    const currentLevel = getCurrentLevel();
    const currentIndex = LEVEL_REQUIREMENTS.findIndex(
      req => req.level === currentLevel.level
    );
    return LEVEL_REQUIREMENTS[currentIndex + 1];
  }, [getCurrentLevel]);

  const getLevelProgress = useCallback(() => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();

    if (!nextLevel) return { current: xp, next: currentLevel.maxXP, percentage: 100 };

    const totalXP = nextLevel.minXP - currentLevel.minXP;
    const currentXP = xp - currentLevel.minXP;
    const percentage = Math.min((currentXP / totalXP) * 100, 100);

    return {
      current: xp,
      next: nextLevel.minXP,
      percentage
    };
  }, [xp, getCurrentLevel, getNextLevel]);

  return {
    currentLevel: getCurrentLevel(),
    nextLevel: getNextLevel(),
    progress: getLevelProgress()
  };
};