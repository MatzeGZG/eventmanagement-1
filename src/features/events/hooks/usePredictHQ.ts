import { useState, useCallback } from 'react';
import { PredictHQAPI } from '../api/predictHQ';
import { useAsync } from '../../../hooks/useAsync';
import { transformPredictHQEvent } from '../api/transformers';
import { SearchEventsParams } from '../api/types';

const api = new PredictHQAPI();

export const usePredictHQ = () => {
  const [loading, setLoading] = useState(false);
  const { execute } = useAsync();

  const searchEvents = useCallback(async (params: SearchEventsParams) => {
    setLoading(true);
    try {
      const response = await execute(api.searchEvents(params));
      return response.results.map(transformPredictHQEvent);
    } catch (error) {
      console.error('PredictHQ search error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [execute]);

  const getEventDetails = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await execute(api.getEventDetails(id));
      return transformPredictHQEvent(response);
    } catch (error) {
      console.error('PredictHQ event details error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [execute]);

  return {
    loading,
    searchEvents,
    getEventDetails
  };
};