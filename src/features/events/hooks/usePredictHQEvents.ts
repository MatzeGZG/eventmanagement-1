import { useState, useCallback } from 'react';
import { predictHQService } from '../services/predictHQService';
import { useToast } from '../../../hooks/useToast';
import { Event } from '../../../types/event';
import { transformPredictHQEvent } from '../api/transformers/predicthqTransformer';
import { PredictHQSearchParams } from '../api/types/predicthq';
import { isPredictHQAuthError } from '../api/utils/errorHandler';

export const usePredictHQEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const { showToast } = useToast();

  const fetchEvents = useCallback(async (params?: Partial<PredictHQSearchParams>) => {
    setLoading(true);
    try {
      const response = await predictHQService.getEventsInZug(params);
      const transformedEvents = response.results.map(transformPredictHQEvent);
      setEvents(transformedEvents);
      
      if (transformedEvents.length === 0) {
        showToast('No events found in Zug for the specified period', 'info');
      } else {
        showToast(`Found ${transformedEvents.length} events in Zug`, 'success');
      }
      
      return transformedEvents;
    } catch (error) {
      if (isPredictHQAuthError(error)) {
        showToast('Invalid or expired API token. Please check your configuration.', 'error');
      } else {
        const message = error instanceof Error ? error.message : 'Failed to fetch events';
        showToast(message, 'error');
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    events,
    fetchEvents
  };
};