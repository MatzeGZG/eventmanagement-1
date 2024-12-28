import { useState, useCallback, useEffect } from 'react';
import { MediaItem, MediaFilters } from '../types';
import { TEST_MEDIA_ITEMS } from '../../../data/testMedia';

export const useEventMedia = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<MediaFilters>({
    view: 'grid',
    sort: 'latest',
    timeframe: 'all'
  });

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use test media items
      const itemsPerPage = 4;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = TEST_MEDIA_ITEMS.slice(startIndex, endIndex);
      
      setMediaItems(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
        return [...prev, ...uniqueNewItems];
      });
      
      setHasMore(endIndex < TEST_MEDIA_ITEMS.length);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadMore();
  }, []);

  const updateFilters = useCallback((newFilters: MediaFilters) => {
    setFilters(newFilters);
    setMediaItems([]);
    setPage(1);
    setHasMore(true);
    loadMore();
  }, [loadMore]);

  return {
    mediaItems,
    loading,
    hasMore,
    loadMore,
    filters,
    updateFilters
  };
};