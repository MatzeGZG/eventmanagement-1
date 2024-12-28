import { useStore } from './index';
import type { StoreState } from './types';

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

// Type-safe action hooks
export const useStoreActions = () => ({
  // User actions
  setUser: useStore(state => state.setUser),
  updateUser: useStore(state => state.updateUser),
  addBadge: useStore(state => state.addBadge),
  
  // Event actions
  addEvent: useStore(state => state.addEvent),
  updateEvent: useStore(state => state.updateEvent),
  deleteEvent: useStore(state => state.deleteEvent),
  
  // UI actions
  toggleMyEvents: useStore(state => state.toggleMyEvents),
  setView: useStore(state => state.setView)
});