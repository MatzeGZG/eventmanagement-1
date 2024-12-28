import { useCallback } from 'react';
import { useStore } from '../../../store';
import { PointActivityType, SpendingType } from '../types';
import { POINT_VALUES, SPENDING_COSTS } from '../constants';
import { useMembership } from '../../membership/hooks/useMembership';

export const usePointSystem = () => {
  const { user, updatePoints } = useStore();
  const { getCurrentTier } = useMembership();

  const getPointMultiplier = useCallback(() => {
    const tier = getCurrentTier();
    switch (tier) {
      case 'Premium':
        return 1.25;
      case 'Elite':
        return 2;
      default:
        return 1;
    }
  }, [getCurrentTier]);

  const awardPoints = useCallback((type: PointActivityType) => {
    if (!user) return;

    const basePoints = POINT_VALUES[type];
    const multiplier = getPointMultiplier();
    const points = Math.floor(basePoints * multiplier);

    updatePoints(points);

    return {
      points,
      multiplier,
      total: points * multiplier
    };
  }, [user, getPointMultiplier, updatePoints]);

  const spendPoints = useCallback((type: SpendingType, amount?: number) => {
    if (!user) return false;

    const cost = amount || SPENDING_COSTS[type].fixed || SPENDING_COSTS[type].min;
    if (user.points < cost) return false;

    updatePoints(-cost);
    return true;
  }, [user, updatePoints]);

  const canAfford = useCallback((type: SpendingType, amount?: number) => {
    if (!user) return false;

    const cost = amount || SPENDING_COSTS[type].fixed || SPENDING_COSTS[type].min;
    return user.points >= cost;
  }, [user]);

  return {
    awardPoints,
    spendPoints,
    canAfford,
    currentPoints: user?.points || 0,
    pointMultiplier: getPointMultiplier()
  };
};