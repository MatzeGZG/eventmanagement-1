import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createGamificationSlice } from './slices/gamificationSlice';
import { createUserSlice } from './slices/userSlice';
import { createEventSlice } from './slices/eventSlice';
import { createUISlice } from './slices/uiSlice';
import { STORE_CONFIG } from './config';
import type { StoreState } from './types';

// Create the store instance
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createGamificationSlice(...a),
        ...createUserSlice(...a),
        ...createEventSlice(...a),
        ...createUISlice(...a),
      }),
      STORE_CONFIG
    )
  )
);

// Export hooks
export * from './hooks';

// Export types
export type { StoreState };