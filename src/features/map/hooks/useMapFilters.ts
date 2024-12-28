import { useState, useCallback } from 'react';
import { EventCategory } from '../../../types/event';

interface MapFilters {
  searchTerm: string;
  categories: EventCategory[];
  maxDistance: number;
}

const initialFilters: MapFilters = {
  searchTerm: '',
  categories: [],
  maxDistance: 10
};

export const useMapFilters = () => {
  const [filters, setFilters] = useState<MapFilters>(initialFilters);

  const updateFilters = useCallback((updates: Partial<MapFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  return {
    filters,
    updateFilters
  };
};