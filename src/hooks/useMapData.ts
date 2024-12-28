```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Event } from '../types/event';
import { LngLatBounds } from 'mapbox-gl';
import { EnhancedErrorHandler } from '../utils/errorHandling/enhancedErrorHandler';
import { ErrorLogger } from '../utils/errorHandling/errorLogger';

export const useMapData = () => {
  const [loading, setLoading] = useState(true);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const events = useStore(state => state.events);

  const updateVisibleEvents = useCallback((bounds: LngLatBounds | null) => {
    try {
      if (!events?.length || !bounds) {
        setVisibleEvents([]);
        return;
      }

      const filtered = events.filter(event => {
        const { latitude, longitude } = event.location.coordinates;
        return (
          latitude >= bounds.getSouth() &&
          latitude <= bounds.getNorth() &&
          longitude >= bounds.getWest() &&
          longitude <= bounds.getEast()
        );
      });

      setVisibleEvents(filtered);
      setLoading(false);
    } catch (error) {
      EnhancedErrorHandler.handleError(error, {
        component: 'useMapData',
        action: 'updateVisibleEvents',
        metadata: { boundsPresent: !!bounds }
      });

      ErrorLogger.log('MAP_ERROR', 'Failed to update visible events', {
        error,
        eventsCount: events?.length
      });

      setVisibleEvents([]);
      setLoading(false);
    }
  }, [events]);

  return {
    loading,
    visibleEvents,
    updateVisibleEvents
  };
};
```