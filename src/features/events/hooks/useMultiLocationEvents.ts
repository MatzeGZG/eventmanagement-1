import { useState, useCallback } from 'react';
import { useLocationEvents } from './useLocationEvents';
import { SUPPORTED_LOCATIONS } from '../config/locations';

export const useMultiLocationEvents = () => {
  const [loading, setLoading] = useState(false);
  const { fetchEventsForLocation } = useLocationEvents();

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        Object.values(SUPPORTED_LOCATIONS).map(location => 
          fetchEventsForLocation(location)
        )
      );
      
      return results.flat();
    } finally {
      setLoading(false);
    }
  }, [fetchEventsForLocation]);

  return {
    loading,
    fetchAllEvents
  };
};