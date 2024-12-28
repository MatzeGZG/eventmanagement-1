```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { FeedItem } from '../types';
import { InfiniteScroll } from '../../../components/common/InfiniteScroll';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorLogger } from '../../../utils/errorHandling/errorLogger';

interface FeedListProps {
  items: FeedItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
}

export const FeedList: React.FC<FeedListProps> = ({ 
  items, 
  loading, 
  hasMore, 
  onLoadMore 
}) => {
  const handleLoadMore = async () => {
    try {
      await onLoadMore();
    } catch (error) {
      ErrorLogger.log('FEED_ERROR', 'Failed to load more items', {
        error,
        currentItemCount: items.length
      });
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      loadMore={handleLoadMore}
      hasMore={hasMore}
      className="space-y-6"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-fjs-charcoal rounded-lg p-6"
        >
          <h3 className="text-fjs-gold font-semibold mb-2">{item.title}</h3>
          <p className="text-fjs-silver">{item.description}</p>
        </motion.div>
      ))}
      {loading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner size="md" />
        </div>
      )}
    </InfiniteScroll>
  );
};
```