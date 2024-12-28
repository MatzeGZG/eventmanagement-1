import { useCallback } from 'react';
import { useStore } from '../../../store';
import { OrganizerSpendingType, SPENDING_OPTIONS } from '../types/points';

export const useOrganizerPoints = () => {
  const user = useStore(state => state.user);
  const updatePoints = useStore(state => state.updatePoints);

  const canAffordSpending = useCallback((type: OrganizerSpendingType) => {
    if (!user) return false;
    const option = SPENDING_OPTIONS.find(opt => opt.type === type);
    return option ? user.points >= option.cost : false;
  }, [user]);

  const spendPoints = useCallback((type: OrganizerSpendingType) => {
    if (!user) return false;
    
    const option = SPENDING_OPTIONS.find(opt => opt.type === type);
    if (!option || user.points < option.cost) return false;

    updatePoints(-option.cost);
    return true;
  }, [user, updatePoints]);

  const getActiveBoosts = useCallback(() => {
    // In a real app, this would come from the backend
    return SPENDING_OPTIONS.filter(opt => 
      opt.duration && canAffordSpending(opt.type)
    );
  }, [canAffordSpending]);

  return {
    points: user?.points || 0,
    canAffordSpending,
    spendPoints,
    getActiveBoosts
  };
};