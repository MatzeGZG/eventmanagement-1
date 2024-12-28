import { useCallback } from 'react';
import { useStore } from '../../../store';
import { MEMBERSHIP_REQUIREMENTS, MembershipTier } from '../types/membership';

export const useMembership = () => {
  const user = useStore(state => state.user);

  const getCurrentTier = useCallback(() => {
    if (!user) return MEMBERSHIP_REQUIREMENTS[0];

    return MEMBERSHIP_REQUIREMENTS.find(
      req => user.points >= req.minPoints && user.points <= req.maxPoints
    ) || MEMBERSHIP_REQUIREMENTS[0];
  }, [user]);

  const getPointsToNextTier = useCallback(() => {
    if (!user) return Infinity;

    const currentTier = getCurrentTier();
    const nextTierReq = MEMBERSHIP_REQUIREMENTS.find(
      req => req.tier > currentTier.tier
    );

    return nextTierReq ? nextTierReq.minPoints - user.points : 0;
  }, [user, getCurrentTier]);

  const getTierBenefits = useCallback(() => {
    const currentTier = getCurrentTier();
    return currentTier.benefits;
  }, [getCurrentTier]);

  return {
    getCurrentTier,
    getPointsToNextTier,
    getTierBenefits
  };
};