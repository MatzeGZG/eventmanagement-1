import { useCallback } from 'react';
import { useStore } from '../../../store';
import { PointActivityType } from '../types';
import { POINT_VALUES, STREAK_BONUSES } from '../constants';
import { LEVEL_REQUIREMENTS } from '../constants/levels';
import { useMembership } from '../../membership/hooks/useMembership';

export const useGamification = () => {
  const { user, updateUser, addBadge } = useStore();
  const { getCurrentTier } = useMembership();

  const getPointMultiplier = useCallback(() => {
    if (!user) return 1;

    const currentTier = getCurrentTier();
    switch (currentTier) {
      case 'Elite':
        return 2;
      case 'Premium':
        return 1.25;
      default:
        return 1;
    }
  }, [user, getCurrentTier]);

  const awardPoints = useCallback((
    activityType: PointActivityType,
    additionalXP: number = 0
  ) => {
    if (!user) return;

    const basePoints = POINT_VALUES[activityType];
    const multiplier = getPointMultiplier();
    const points = Math.floor(basePoints * multiplier);

    updateUser({
      ...user,
      points: user.points + points,
      xp: user.xp + points + additionalXP,
      lastActivityAt: new Date()
    });

    return {
      basePoints,
      multiplier,
      totalPoints: points
    };
  }, [user, getPointMultiplier, updateUser]);

  const getNextLevelProgress = useCallback(() => {
    if (!user) return { currentXP: 0, nextLevelXP: 0, progress: 0 };

    const currentLevel = LEVEL_REQUIREMENTS.find(
      req => user.xp >= req.minXP && user.xp <= req.maxXP
    );
    const nextLevel = LEVEL_REQUIREMENTS[LEVEL_REQUIREMENTS.indexOf(currentLevel!) + 1];

    if (!nextLevel) return {
      currentXP: user.xp,
      nextLevelXP: currentLevel!.maxXP,
      progress: 100
    };

    const progress = ((user.xp - currentLevel!.minXP) / 
      (nextLevel.minXP - currentLevel!.minXP)) * 100;

    return {
      currentXP: user.xp,
      nextLevelXP: nextLevel.minXP,
      progress
    };
  }, [user]);

  return {
    awardPoints,
    getNextLevelProgress,
    pointMultiplier: getPointMultiplier(),
    currentStreak: user?.currentStreak || 0,
    longestStreak: user?.longestStreak || 0
  };
};