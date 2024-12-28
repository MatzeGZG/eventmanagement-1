import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaCard } from './MediaCard';
import { MediaItem } from '../../types';
import { InfiniteScroll } from '../../../../components/common/InfiniteScroll';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

interface MediaGridProps {
  items: MediaItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  loading,
  hasMore,
  onLoadMore
}) => {
  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      loadMore={onLoadMore}
      hasMore={hasMore}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <MediaCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
      {loading && items.length > 0 && (
        <div className="col-span-full flex justify-center py-4">
          <LoadingSpinner size="md" />
        </div>
      )}
    </InfiniteScroll>
  );
};