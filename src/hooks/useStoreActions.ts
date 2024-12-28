```typescript
import { useStore } from '../store';

// Typed actions for store mutations
export const useStoreActions = () => ({
  // User actions
  setUser: useStore(state => state.setUser),
  updateUser: useStore(state => state.updateUser),
  
  // Event actions  
  addEvent: useStore(state => state.addEvent),
  updateEvent: useStore(state => state.updateEvent),
  deleteEvent: useStore(state => state.deleteEvent),
  
  // UI actions
  toggleMyEvents: useStore(state => state.toggleMyEvents),
  setView: useStore(state => state.setView)
});
```