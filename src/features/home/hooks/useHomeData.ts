```typescript
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../../store';
import { useLocation } from '../../../hooks/useLocation';
import { Event } from '../../../types/event';

export const useHomeData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nearbyEvents, setNearbyEvents] = useState<Event[]>([]);

  const { coordinates } = useLocation();
  const events = useStore(state => state.events);
  const user = useStore(state => state.user);

  const loadNearbyEvents = useCallback(async () => {
    if (!coordinates) return;

    setLoading(true);
    try {
      // Filter events by location
      const filtered = events.filter(event => {
        // Calculate distance and filter
        return true; // Implement actual distance calculation
      });

      setNearbyEvents(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [coordinates, events]);

  useEffect(() => {
    loadNearbyEvents();
  }, [loadNearbyEvents]);

  return {
    loading,
    error,
    nearbyEvents,
    user,
    coordinates
  };
};
```