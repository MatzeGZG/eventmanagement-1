```typescript
import { useState, useCallback } from 'react';
import { MultiDayEvent, SubEvent } from '../types/multiDayEvent';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';

export const useMultiDayEvent = (eventId: string) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const updateEvent = useStore(state => state.updateEvent);

  const addSubEvent = useCallback(async (subEvent: Omit<SubEvent, 'id' | 'parentEventId'>) => {
    setLoading(true);
    try {
      const newSubEvent: SubEvent = {
        id: crypto.randomUUID(),
        parentEventId: eventId,
        ...subEvent,
        attendees: []
      };

      await updateEvent({
        id: eventId,
        subEvents: (prev: SubEvent[]) => [...prev, newSubEvent]
      } as MultiDayEvent);

      showToast('Sub-event added successfully', 'success');
      return newSubEvent;
    } catch (error) {
      showToast('Failed to add sub-event', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [eventId, updateEvent, showToast]);

  const addToWaitlist = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      await updateEvent({
        id: eventId,
        waitlist: (prev: string[]) => [...prev, userId]
      } as MultiDayEvent);

      showToast('Added to waitlist', 'success');
    } catch (error) {
      showToast('Failed to add to waitlist', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [eventId, updateEvent, showToast]);

  return {
    loading,
    addSubEvent,
    addToWaitlist
  };
};
```