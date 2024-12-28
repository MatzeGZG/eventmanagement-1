```typescript
import store from '../store';
import type { StoreState } from '../store/types';

// Type-safe hook for using the store
export function useStoreSelector<T>(selector: (state: StoreState) => T): T {
  return store(selector);
}

// Export store instance for direct usage
export { store };
```