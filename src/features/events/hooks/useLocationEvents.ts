import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { eventsService } from '../services/eventsService';
import { useToast } from '../../../hooks/useToast';

export const useLocationEvents = () => {
  const [loading, setLoading] = useState(false);
  const addEvent = useStore(state => state.addEvent);
  const { showToast } = useToast();

  const fetchEventsForLocation = useCallback(async (
    location: { lat: number; lon: number; name: string }
  ) => {
    setLoading(true);
    try {
      const events = await eventsService.getEventsForLocation({
        lat: location.lat,
        lon: location.lon
      });
      
      // Only add events if we got some back
      if (events.length > 0) {
        events.forEach(event => addEvent(event));
        showToast(
          `Found ${events.length} events near ${location.name}`,
          'success'
        );
      } else {
        showToast(
          `No events found near ${location.name}`,
          'info'
        );
      }
      
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast(
        'Using test data while we connect to the event service',
        'info'
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, [addEvent, showToast]);

  return {
    loading,
    fetchEventsForLocation
  };
};