import { useState, useCallback } from 'react';
import { useStore } from '../store';

export const useMobileData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      // Implement pagination logic here
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      setPage(prev => prev + 1);
      // Check if there's more data to load
      setHasMore(endIndex < totalItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const refresh = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    setError(null);
    await loadMore();
  }, [loadMore]);

  return {
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
};