import { StateCreator } from 'zustand';
import { UserLevel } from '../../types';
import { LEVEL_REQUIREMENTS } from '../../features/gamification/constants/levels';

export interface GamificationSlice {
  level: UserLevel;
  xp: number;
  points: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: Date | null;
  updateXP: (amount: number) => void;
  updatePoints: (amount: number) => void;
  updateStreak: () => void;
}

export const createGamificationSlice: StateCreator<GamificationSlice> = (set, get) => ({
  level: UserLevel.NewExplorer,
  xp: 0,
  points: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityAt: null,

  updateXP: (amount) => {
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = LEVEL_REQUIREMENTS.find(
        req => newXP >= req.minXP && newXP <= req.maxXP
      )?.level || UserLevel.NewExplorer;

      return {
        xp: newXP,
        level: newLevel
      };
    });
  },

  updatePoints: (amount) => {
    set((state) => ({
      points: state.points + amount
    }));
  },

  updateStreak: () => {
    const lastActivity = get().lastActivityAt;
    const now = new Date();
    const diffDays = lastActivity
      ? Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      : 1;

    if (diffDays <= 1) {
      set((state) => ({
        currentStreak: state.currentStreak + 1,
        longestStreak: Math.max(state.currentStreak + 1, state.longestStreak),
        lastActivityAt: now
      }));
    } else {
      set({ currentStreak: 1, lastActivityAt: now });
    }
  }
});