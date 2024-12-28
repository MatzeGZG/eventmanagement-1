import { useStore } from '../index';

// Type-safe selector hooks
export const useUser = () => useStore(state => state.user);
export const useEvents = () => useStore(state => state.events);
export const useUIState = () => useStore(state => ({
  showMyEvents: state.showMyEvents,
  view: state.view
}));
export const useGamification = () => useStore(state => ({
  level: state.level,
  xp: state.xp,
  points: state.points,
  currentStreak: state.currentStreak,
  longestStreak: state.longestStreak
}));