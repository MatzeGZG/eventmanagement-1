import { useCallback } from 'react';
import { useStore } from '../../../store';
import { PointActivityType } from '../types';
import { POINT_VALUES, STREAK_BONUSES } from '../constants';
import { LEVEL_REQUIREMENTS } from '../constants/levels';

export const usePoints = () => {
  const { user, updatePoints, updateXP } = useStore();

  const getPointMultiplier = useCallback(() => {
    if (!user) return 1;

    const currentLevel = LEVEL_REQUIREMENTS.find(
      req => user.xp >= req.minXP && user.xp <= req.maxXP
    );

    switch (currentLevel?.level) {
      case 'PassionPioneer':
        return 4;
      case 'CommunityLeader':
        return 3;
      case 'SocialEnthusiast':
        return 2;
      case 'LocalConnector':
        return 1.25;
      default:
        return 1;
    }
  }, [user]);

  const awardPoints = useCallback((type: PointActivityType) => {
    if (!user) return;

    const basePoints = POINT_VALUES[type];
    const multiplier = getPointMultiplier();
    const points = Math.floor(basePoints * multiplier);

    updatePoints(points);
    updateXP(points);

    return {
      basePoints,
      multiplier,
      totalPoints: points
    };
  }, [user, getPointMultiplier, updatePoints, updateXP]);

  return {
    currentPoints: user?.points || 0,
    pointMultiplier: getPointMultiplier(),
    currentStreak: user?.currentStreak || 0,
    awardPoints
  };
};