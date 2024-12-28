import { useState, useCallback } from 'react';
import { fetchEventsForLocations } from '../../../utils/events/eventFetcher';
import { logEventCounts } from '../../../utils/events/eventLogger';
import { useToast } from '../../../hooks/useToast';
import { useStore } from '../../../store';

export const useEventFetcher = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const events = useStore(state => state.events);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      await fetchEventsForLocations();
      logEventCounts(events);
      showToast('Events fetched successfully', 'success');
    } catch (error) {
      showToast('Error fetching events', 'error');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, [showToast, events]);

  return { fetchEvents, loading };
};