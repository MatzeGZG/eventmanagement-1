```typescript
import { StoreState, StorageState } from '../types';

// Filter state for storage to reduce size
export const filterStateForStorage = (state: StoreState): StorageState => ({
  user: state.user ? {
    id: state.user.id,
    name: state.user.name,
    level: state.user.level,
    points: state.user.points,
    xp: state.user.xp
  } : null,
  gamification: {
    level: state.level,
    xp: state.xp,
    points: state.points,
    currentStreak: state.currentStreak,
    longestStreak: state.longestStreak,
    lastActivityAt: state.lastActivityAt
  },
  ui: {
    showMyEvents: state.showMyEvents,
    view: state.view
  }
});

// Merge stored state with current state
export const mergeStoredState = (
  persisted: Partial<StorageState>, 
  current: StoreState
): StoreState => ({
  ...current,
  ...persisted,
  user: persisted.user ? {
    ...current.user,
    ...persisted.user
  } : null,
  showMyEvents: persisted.ui?.showMyEvents ?? false,
  view: persisted.ui?.view ?? 'map'
});
```