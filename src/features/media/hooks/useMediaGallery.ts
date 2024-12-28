import { useState, useCallback, useEffect, useRef } from 'react';
import { MediaItem, MediaFilters } from '../types';
import { useDebounce } from '../../../utils/hooks/useDebounce';

const PAGE_SIZE = 12;

export const useMediaGallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<MediaFilters>({
    view: 'grid',
    sort: 'latest',
    timeframe: 'all'
  });

  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const debouncedFilters = useDebounce(filters, 300);

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);

    try {
      // Mock API call - replace with actual API in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItems: MediaItem[] = []; // Replace with actual API data
      setMediaItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length === PAGE_SIZE);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading media items:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  const updateFilters = useCallback((newFilters: MediaFilters) => {
    setFilters(newFilters);
    setPage(1);
    setMediaItems([]);
    setHasMore(true);
  }, []);

  // Reset and reload when filters change
  useEffect(() => {
    setPage(1);
    setMediaItems([]);
    setHasMore(true);
    loadMore();
  }, [debouncedFilters, loadMore]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setMediaItems([]);
      setPage(1);
    };
  }, []);

  return {
    mediaItems,
    hasMore,
    loading,
    loadMore,
    filters,
    updateFilters
  };
};