import { StorageState } from '../types';

export const migrations = {
  0: (state: any): StorageState => ({
    user: null,
    gamification: {
      level: 'New Explorer',
      xp: 0,
      points: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityAt: null
    }
  }),
  1: (state: StorageState): StorageState => ({
    ...state,
    gamification: {
      ...state.gamification,
      lastActivityAt: state.gamification.lastActivityAt || null
    }
  })
};