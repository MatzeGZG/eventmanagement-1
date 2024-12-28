import React from 'react';
import { motion } from 'framer-motion';
import { MediaItem } from './MediaItem';
import { InfiniteScroll } from '../../../../components/common/InfiniteScroll';
import { MediaItem as MediaItemType } from '../../types';

interface GalleryGridProps {
  items: MediaItemType[];
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  hasMore,
  onLoadMore
}) => (
  <InfiniteScroll
    loadMore={onLoadMore}
    hasMore={hasMore}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  >
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MediaItem item={item} />
      </motion.div>
    ))}
  </InfiniteScroll>
);