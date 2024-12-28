import { useState, useCallback } from 'react';
import { SearchResult } from '../types';
import { useSearchFilters } from './useSearchFilters';
import { useSearchResults } from './useSearchResults';

export const useEventSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  
  const { filters, updateFilters, resetFilters } = useSearchFilters();
  const { getSearchResults } = useSearchResults();

  const searchEvents = useCallback(async (searchQuery: string) => {
    if (!searchQuery?.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await getSearchResults(searchQuery, filters);
      setSuggestions(results);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [filters, getSearchResults]);

  return {
    query,
    setQuery,
    loading,
    suggestions,
    filters,
    updateFilters,
    resetFilters,
    searchEvents
  };
};