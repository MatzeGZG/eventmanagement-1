import { useState, useCallback } from 'react';
import { CalendarFilters } from '../types';
import { EventCategory } from '../../../types/event';

const initialFilters: CalendarFilters = {
  categories: [],
  location: undefined,
  dateRange: undefined
};

export const useCalendarFilters = () => {
  const [filters, setFilters] = useState<CalendarFilters>(initialFilters);
  const [showMyEvents, setShowMyEvents] = useState(false);

  const updateFilters = useCallback((newFilters: Partial<CalendarFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    showMyEvents,
    updateFilters,
    resetFilters,
    setShowMyEvents
  };
};