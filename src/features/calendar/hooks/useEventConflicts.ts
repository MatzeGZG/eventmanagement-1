```typescript
import { useCallback } from 'react';
import { Event } from '../../../types/event';
import { areIntervalsOverlapping } from 'date-fns';

export const useEventConflicts = () => {
  const checkConflicts = useCallback((
    event: Event,
    existingEvents: Event[]
  ): Event[] => {
    const eventStart = new Date(event.date);
    const eventEnd = new Date(event.date);
    eventEnd.setHours(eventEnd.getHours() + 2); // Assume 2-hour duration

    return existingEvents.filter(existing => {
      if (existing.id === event.id) return false;

      const existingStart = new Date(existing.date);
      const existingEnd = new Date(existing.date);
      existingEnd.setHours(existingEnd.getHours() + 2);

      return areIntervalsOverlapping(
        { start: eventStart, end: eventEnd },
        { start: existingStart, end: existingEnd }
      );
    });
  }, []);

  return { checkConflicts };
};
```