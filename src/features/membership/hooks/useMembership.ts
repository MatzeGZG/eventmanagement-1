import { useCallback } from 'react';
import { useStore } from '../../../store';
import { MEMBERSHIP_REQUIREMENTS } from '../constants';
import { MembershipTier } from '../types';

export const useMembership = () => {
  const user = useStore((state) => state.user);

  const getCurrentTier = useCallback(() => {
    if (!user) return MembershipTier.Basic;

    return MEMBERSHIP_REQUIREMENTS.find(
      (req) => user.points >= req.minPoints && user.points <= req.maxPoints
    )?.tier || MembershipTier.Basic;
  }, [user]);

  const getPointsToNextTier = useCallback(() => {
    if (!user) return Infinity;

    const currentTier = getCurrentTier();
    const nextTierReq = MEMBERSHIP_REQUIREMENTS.find(
      (req) => req.tier > currentTier
    );

    return nextTierReq ? nextTierReq.minPoints - user.points : 0;
  }, [user, getCurrentTier]);

  const getTierBenefits = useCallback((tier: MembershipTier) => {
    return MEMBERSHIP_REQUIREMENTS.find((req) => req.tier === tier)?.benefits || [];
  }, []);

  return {
    getCurrentTier,
    getPointsToNextTier,
    getTierBenefits
  };
};