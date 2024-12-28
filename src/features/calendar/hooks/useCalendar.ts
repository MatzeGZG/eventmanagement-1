import { useState, useCallback } from 'react';
import { CalendarFilter } from '../types';
import { EventCategory } from '../../../types/event';
import { startOfMonth, endOfMonth } from 'date-fns';

export const useCalendar = () => {
  const [filters, setFilters] = useState<CalendarFilter>({
    categories: [],
    dateRange: {
      start: new Date(),
      end: endOfMonth(new Date())
    },
    location: {
      city: '',
      radius: 10
    }
  });

  const updateFilters = useCallback((newFilters: Partial<CalendarFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  return {
    filters,
    updateFilters
  };
};