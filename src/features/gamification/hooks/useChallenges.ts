import { useCallback, useState } from 'react';
import { useStore } from '../../../store';
import { CHALLENGE_TYPES } from '../constants';
import { usePoints } from '../../../hooks/usePoints';

export const useChallenges = () => {
  const { user } = useStore();
  const { awardPoints } = usePoints();
  const [activeChallenges, setActiveChallenges] = useState<any[]>([]);

  const completeChallenge = useCallback((challengeId: string) => {
    if (!user) return;

    const challenge = activeChallenges.find(c => c.id === challengeId);
    if (!challenge || challenge.claimed) return;

    awardPoints(challenge.reward);
    setActiveChallenges(prev =>
      prev.map(c =>
        c.id === challengeId ? { ...c, claimed: true } : c
      )
    );
  }, [user, activeChallenges, awardPoints]);

  const getDailyChallenges = useCallback(() => {
    return activeChallenges.filter(c => c.type === CHALLENGE_TYPES.DAILY);
  }, [activeChallenges]);

  const getWeeklyChallenges = useCallback(() => {
    return activeChallenges.filter(c => c.type === CHALLENGE_TYPES.WEEKLY);
  }, [activeChallenges]);

  return {
    activeChallenges,
    completeChallenge,
    getDailyChallenges,
    getWeeklyChallenges
  };
};