```typescript
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { User } from '../../../types/user';

export const useTestStore = () => {
  const resetStore = () => {
    useStore.setState({
      events: [],
      user: null,
      points: 0,
      xp: 0,
      level: 'New Explorer',
      currentStreak: 0,
      longestStreak: 0
    });
  };

  const populateEvents = (events: Event[]) => {
    useStore.setState({ events });
  };

  const setUser = (user: User | null) => {
    useStore.setState({ user });
  };

  return {
    resetStore,
    populateEvents,
    setUser,
    getState: useStore.getState
  };
};
```