```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';
import { PredictHQService } from '../services/predictHQService';
import { TEST_EVENTS } from '../../../data/testEvents';

export const useRealEvents = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addEvent = useStore(state => state.addEvent);
  const { showToast } = useToast();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Attempt to fetch real events from both locations
      const [zugEvents, londonEvents] = await Promise.all([
        PredictHQService.getEvents({
          location: {
            lat: 47.1662,
            lon: 8.5155,
            radius: '20km'
          }
        }),
        PredictHQService.getEvents({
          location: {
            lat: 51.5074,
            lon: -0.1278,
            radius: '20km'
          }
        })
      ]);

      // Add all events to store
      [...zugEvents, ...londonEvents].forEach(addEvent);

      return { zug: zugEvents, london: londonEvents };
    } catch (err) {
      console.warn('Failed to fetch real events, using test data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      
      // Use test data as fallback
      TEST_EVENTS.forEach(addEvent);
      
      showToast(
        'Using demo data while we connect to the event service',
        'info'
      );

      return { 
        zug: TEST_EVENTS.filter(e => e.location.city === 'Zug'),
        london: TEST_EVENTS.filter(e => e.location.city === 'London')
      };
    } finally {
      setLoading(false);
    }
  }, [addEvent, showToast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    loading,
    error,
    fetchEvents
  };
};
```