import { useCallback } from 'react';
import { useStore } from '../store';
import { Event } from '../types/event';
import { usePoints } from './usePoints';
import { validateEvent } from '../utils/validation';

export const useEventActions = () => {
  const { addEvent, updateEvent, deleteEvent } = useStore();
  const { handleEventAttendance } = usePoints();

  const createEvent = useCallback(
    (event: Event) => {
      const errors = validateEvent(event);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      addEvent(event);
    },
    [addEvent]
  );

  const attendEvent = useCallback(
    (eventId: string, userId: string) => {
      const event = useStore.getState().events.find((e) => e.id === eventId);
      if (!event) return;

      if (event.attendees.includes(userId)) return;

      updateEvent({
        ...event,
        attendees: [...event.attendees, userId],
      });

      handleEventAttendance();
    },
    [updateEvent, handleEventAttendance]
  );

  return {
    createEvent,
    attendEvent,
    updateEvent,
    deleteEvent,
  };
};