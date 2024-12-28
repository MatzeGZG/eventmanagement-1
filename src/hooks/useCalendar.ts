import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { CalendarFilter } from '../features/calendar/types';

export const useCalendar = () => {
  const [loading, setLoading] = useState(false);
  const events = useStore(state => state.events);
  const [filters, setFilters] = useState<CalendarFilter>({
    categories: [],
    dateRange: {
      start: new Date(),
      end: new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
  });

  const updateFilters = useCallback((newFilters: Partial<CalendarFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const filteredEvents = useCallback(() => {
    return events.filter(event => {
      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
        return false;
      }

      // Filter by date range
      if (filters.dateRange) {
        const eventDate = new Date(event.date);
        if (eventDate < filters.dateRange.start || eventDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  return {
    events: filteredEvents(),
    loading,
    filters,
    updateFilters
  };
};