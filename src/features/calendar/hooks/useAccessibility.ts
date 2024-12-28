```typescript
import { useCallback } from 'react';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';

export const useAccessibility = () => {
  const getEventAriaLabel = useCallback((event: Event): string => {
    return `${event.title} on ${formatDate(event.date)} at ${event.location.address}`;
  }, []);

  const getCalendarAriaLabel = useCallback((date: Date, view: string): string => {
    return `Calendar view showing ${view} of ${formatDate(date)}`;
  }, []);

  const getNavigationAriaLabel = useCallback((direction: 'prev' | 'next', view: string): string => {
    return `Go to ${direction === 'prev' ? 'previous' : 'next'} ${view}`;
  }, []);

  return {
    getEventAriaLabel,
    getCalendarAriaLabel,
    getNavigationAriaLabel
  };
};
```