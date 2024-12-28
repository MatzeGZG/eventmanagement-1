import { useCallback } from 'react';
import { useStore } from '../../../store';
import { POINTS_CONFIG } from '../../../utils/points';

export const useMarketplace = () => {
  const { user, updatePoints } = useStore();

  const purchaseWithPoints = useCallback((itemCost: number) => {
    if (!user || user.points < itemCost) {
      throw new Error('Insufficient points');
    }
    
    updatePoints(-itemCost);
  }, [user, updatePoints]);

  const canAffordItem = useCallback((itemCost: number) => {
    return user ? user.points >= itemCost : false;
  }, [user]);

  return {
    purchaseWithPoints,
    canAffordItem,
    userPoints: user?.points || 0,
  };
};