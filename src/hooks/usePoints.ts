import { useCallback } from 'react';
import { useStore } from '../store';
import { POINTS_CONFIG } from '../utils/points';

export const usePoints = () => {
  const updatePoints = useStore((state) => state.updatePoints);
  const updateXP = useStore((state) => state.updateXP);

  const awardPoints = useCallback(
    (amount: number, xpMultiplier = 1) => {
      updatePoints(amount);
      updateXP(Math.floor(amount * xpMultiplier));
    },
    [updatePoints, updateXP]
  );

  const handleEventAttendance = useCallback(() => {
    awardPoints(POINTS_CONFIG.ATTENDANCE, 1.5);
  }, [awardPoints]);

  const handleEventReview = useCallback(
    (isDetailed: boolean) => {
      const points = isDetailed ? POINTS_CONFIG.DETAILED_REVIEW : POINTS_CONFIG.REVIEW;
      awardPoints(points);
    },
    [awardPoints]
  );

  return {
    awardPoints,
    handleEventAttendance,
    handleEventReview,
  };
};