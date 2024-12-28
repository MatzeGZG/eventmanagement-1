```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createGamificationSlice } from './slices/gamificationSlice';
import { createUserSlice } from './slices/userSlice';
import { createEventSlice } from './slices/eventSlice';
import { filterStateForStorage, mergeStoredState } from './utils/storage';
import type { StoreState } from './types';

export const createStore = () => 
  create<StoreState>()(
    devtools(
      persist(
        (...a) => ({
          ...createGamificationSlice(...a),
          ...createUserSlice(...a),
          ...createEventSlice(...a),
        }),
        {
          name: 'funjet-setter-storage',
          partialize: filterStateForStorage,
          merge: mergeStoredState,
          version: 1
        }
      )
    )
  );
```