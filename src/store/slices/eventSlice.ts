import { StateCreator } from 'zustand';
import { Event } from '../../types/event';

export interface EventSlice {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

export const createEventSlice: StateCreator<EventSlice> = (set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== eventId),
    })),
});