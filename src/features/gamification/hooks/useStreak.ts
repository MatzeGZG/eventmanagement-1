import { useCallback } from 'react';
import { useStore } from '../../../store';

export const useStreak = () => {
  const { user, updateUser } = useStore();

  const updateStreak = useCallback(() => {
    if (!user) return;

    const lastActivity = new Date(user.lastActivityAt || 0);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = user.currentStreak || 0;
    if (diffDays <= 1) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, user.longestStreak || 0);

    updateUser({
      ...user,
      currentStreak: newStreak,
      longestStreak,
      lastActivityAt: today
    });
  }, [user, updateUser]);

  return {
    currentStreak: user?.currentStreak || 0,
    longestStreak: user?.longestStreak || 0,
    updateStreak
  };
};