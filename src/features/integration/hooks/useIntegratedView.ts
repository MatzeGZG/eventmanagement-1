```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { useViewSync } from './useViewSync';
import { useViewTransition } from './useViewTransition';
import { ViewportOptimizer } from '../../../utils/performance/viewportOptimizer';

export const useIntegratedView = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { events } = useStore();
  const { syncViews } = useViewSync();
  const { selectedEvent, handleEventSelect } = useViewTransition();

  const handleSync = useCallback(async (eventId: string, updates: Partial<Event>) => {
    setSyncing(true);
    try {
      await syncViews(eventId, updates);
      setLastSynced(new Date());
    } finally {
      setSyncing(false);
    }
  }, [syncViews]);

  useEffect(() => {
    const container = document.getElementById('integrated-view');
    if (!container) return;

    return ViewportOptimizer.optimizeRendering(container, () => {
      // Optimize rendering when view comes into viewport
    });
  }, []);

  return {
    events,
    selectedEvent,
    syncing,
    lastSynced,
    handleEventSelect,
    handleSync
  };
};
```