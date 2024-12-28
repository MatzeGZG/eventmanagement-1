import { useCallback } from 'react';
import { useStore } from '../../../store';
import { ORGANIZER_LEVELS, OrganizerLevel } from '../types/gamification';

export const useOrganizerLevel = () => {
  const user = useStore(state => state.user);
  const updateUser = useStore(state => state.updateUser);

  const getCurrentLevel = useCallback(() => {
    if (!user) return ORGANIZER_LEVELS[0];

    return ORGANIZER_LEVELS.find(
      level => user.organizerXP >= level.minXP && user.organizerXP <= level.maxXP
    ) || ORGANIZER_LEVELS[0];
  }, [user]);

  const getNextLevel = useCallback(() => {
    const currentLevel = getCurrentLevel();
    const currentIndex = ORGANIZER_LEVELS.findIndex(
      level => level.level === currentLevel.level
    );
    return ORGANIZER_LEVELS[currentIndex + 1];
  }, [getCurrentLevel]);

  const getProgress = useCallback(() => {
    if (!user) return { current: 0, next: 0, percentage: 0 };

    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();

    if (!nextLevel) return { current: user.organizerXP, next: currentLevel.maxXP, percentage: 100 };

    const totalXP = nextLevel.minXP - currentLevel.minXP;
    const currentXP = user.organizerXP - currentLevel.minXP;
    const percentage = Math.min((currentXP / totalXP) * 100, 100);

    return {
      current: user.organizerXP,
      next: nextLevel.minXP,
      percentage
    };
  }, [user, getCurrentLevel, getNextLevel]);

  return {
    currentLevel: getCurrentLevel(),
    nextLevel: getNextLevel(),
    progress: getProgress(),
    levels: ORGANIZER_LEVELS
  };
};