import { useStore } from '../store';
import type { StoreState } from '../store/types';

export function useStoreSelector<T>(selector: (state: StoreState) => T): T {
  return useStore(selector);
}

// Common selectors
export const useUser = () => useStoreSelector(state => state.user);
export const useEvents = () => useStoreSelector(state => state.events);
export const useUIState = () => useStoreSelector(state => ({
  showMyEvents: state.showMyEvents,
  view: state.view
}));
export const useGamification = () => useStoreSelector(state => ({
  level: state.level,
  xp: state.xp,
  points: state.points,
  currentStreak: state.currentStreak,
  longestStreak: state.longestStreak
}));