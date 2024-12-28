import { StateCreator } from 'zustand';
import { StoreState } from '../types';

export interface UISlice {
  showMyEvents: boolean;
  view: 'map' | 'list';
  toggleMyEvents: () => void;
  setView: (view: 'map' | 'list') => void;
}

export const createUISlice: StateCreator<StoreState> = (set) => ({
  showMyEvents: false,
  view: 'map',
  toggleMyEvents: () => set((state) => ({ showMyEvents: !state.showMyEvents })),
  setView: (view) => set({ view })
});