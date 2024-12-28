import { useState, useCallback } from 'react';
import { LocationSearchResult } from '../types/location';
import { GeocodingService } from '../utils/location/geocoding';
import { useDebounce } from '../utils/hooks/useDebounce';

export const useLocationSearch = () => {
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = useCallback(async (searchQuery: string | null) => {
    // Reset results if query is empty or invalid
    if (!searchQuery || typeof searchQuery !== 'string') {
      setResults([]);
      return;
    }

    const query = searchQuery.trim();
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await GeocodingService.geocodeAddress(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search location');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebounce(searchLocation, 300);

  return {
    results,
    loading,
    error,
    searchLocation: debouncedSearch
  };
};