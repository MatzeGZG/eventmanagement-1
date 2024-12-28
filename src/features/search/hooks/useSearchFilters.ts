import { useState, useCallback } from 'react';
import { SearchFilters } from '../types';
import { EventCategory } from '../../../types/event';

const initialFilters: SearchFilters = {
  categories: [],
  accessibility: {
    wheelchairAccessible: false,
    familyFriendly: false,
    petFriendly: false,
    signLanguage: false,
    audioDescription: false
  },
  location: undefined,
  dateRange: undefined,
  priceRange: undefined
};

export const useSearchFilters = () => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const updateFilters = useCallback((updates: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const updateCategory = useCallback((category: EventCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    updateCategory
  };
};