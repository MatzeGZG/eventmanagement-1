import { StateCreator } from 'zustand';
import { User } from '../../types/user';
import { Badge } from '../../types/badge';

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user: User) => void;
  addBadge: (badge: Badge) => void;
  updatePoints: (points: number) => void;
  updateXP: (xp: number) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (user) => set({ user }),
  addBadge: (badge) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, badges: [...state.user.badges, badge] }
        : null,
    })),
  updatePoints: (points) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, points: state.user.points + points }
        : null,
    })),
  updateXP: (xp) =>
    set((state) => ({
      user: state.user ? { ...state.user, xp: state.user.xp + xp } : null,
    })),
});