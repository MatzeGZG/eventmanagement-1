import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { processNaturalLanguage } from '../utils/nlpProcessor';

export const useCalendarSearch = () => {
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const events = useStore(state => state.events);

  const searchEvents = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const parsedQuery = await processNaturalLanguage(query);
      
      const filteredEvents = events.filter(event => {
        // Match date range
        if (parsedQuery.dateRange) {
          const eventDate = new Date(event.date);
          if (eventDate < parsedQuery.dateRange.start || 
              eventDate > parsedQuery.dateRange.end) {
            return false;
          }
        }

        // Match categories
        if (parsedQuery.categories?.length) {
          if (!parsedQuery.categories.includes(event.category)) {
            return false;
          }
        }

        // Match location
        if (parsedQuery.location) {
          const locationMatch = 
            event.location.city.toLowerCase().includes(parsedQuery.location.toLowerCase()) ||
            event.location.country.toLowerCase().includes(parsedQuery.location.toLowerCase());
          if (!locationMatch) return false;
        }

        return true;
      });

      setResults(filteredEvents);
    } finally {
      setLoading(false);
    }
  }, [events]);

  return {
    results,
    loading,
    searchEvents
  };
};