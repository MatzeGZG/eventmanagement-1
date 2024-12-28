```typescript
import { useStore } from '../store';

// Typed selectors for common state
export const useUser = () => useStore(state => state.user);
export const useEvents = () => useStore(state => state.events);
export const useUIState = () => useStore(state => ({
  showMyEvents: state.showMyEvents,
  view: state.view
}));
export const useGamification = () => useStore(state => ({
  level: state.level,
  xp: state.xp,
  points: state.points
}));
```