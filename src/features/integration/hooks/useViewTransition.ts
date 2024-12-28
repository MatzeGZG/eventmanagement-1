```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';

export const useViewTransition = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleEventSelect = useCallback((event: Event) => {
    setSelectedEvent(event);
    setTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitioning(false);
  }, []);

  return {
    selectedEvent,
    transitioning,
    handleEventSelect,
    handleTransitionComplete
  };
};
```