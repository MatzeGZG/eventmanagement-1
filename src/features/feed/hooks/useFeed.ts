import { useState, useCallback, useEffect } from 'react';
import { FeedItem, FeedFilters } from '../types';
import { EnhancedErrorHandler } from '../../../utils/errorHandling/enhancedErrorHandler';
import { ErrorLogger } from '../../../utils/errorHandling/errorLogger';

const initialFilters: FeedFilters = {
  sort: 'latest',
  timeframe: 'all'
};

export const useFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FeedFilters>(initialFilters);

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with actual API call
      const newItems: FeedItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        type: Math.random() > 0.5 ? 'event' : 'status',
        title: `Feed Item ${feedItems.length + i + 1}`,
        description: 'This is a mock feed item description for testing purposes.',
        image: `https://picsum.photos/seed/${Date.now() + i}/800/400`,
        data: {},
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        userLiked: Math.random() > 0.5
      }));
      setFeedItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
    } catch (error) {
      await EnhancedErrorHandler.handleError(error, {
        component: 'useFeed',
        action: 'loadMore',
        metadata: { filters }
      });

      ErrorLogger.log('FEED_ERROR', 'Failed to load feed items', {
        error,
        filters
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: FeedFilters) => {
    setFilters(newFilters);
    setFeedItems([]);
    setHasMore(true);
  }, []);

  useEffect(() => {
    loadMore();
  }, [filters, loadMore]);

  return {
    feedItems,
    loading,
    hasMore,
    loadMore,
    filters,
    updateFilters
  };
};