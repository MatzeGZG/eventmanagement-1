```typescript
import { useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { useToast } from '../../../hooks/useToast';

export const useEventSync = () => {
  const { events, updateEvent } = useStore();
  const { showToast } = useToast();

  const syncEventAcrossViews = useCallback((
    eventId: string,
    updates: Partial<Event>
  ) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      updateEvent({ ...event, ...updates });
      showToast('Event updated successfully', 'success');
    } catch (error) {
      showToast('Failed to sync event', 'error');
    }
  }, [events, updateEvent, showToast]);

  return { syncEventAcrossViews };
};
```