import { GamificationSlice } from './slices/gamificationSlice';
import { UserSlice } from './slices/userSlice';
import { EventSlice } from './slices/eventSlice';
import { UISlice } from './slices/uiSlice';

export type StoreState = GamificationSlice & UserSlice & EventSlice & UISlice;

export interface StorageState {
  user: {
    id: string;
    name: string;
    level: string;
    points: number;
    xp: number;
  } | null;
  gamification: {
    level: string;
    xp: number;
    points: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityAt: Date | null;
  };
}