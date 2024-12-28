import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MediaItem } from './MediaItem';
import { MediaUploadButton } from './MediaUploadButton';
import { useMediaGallery } from '../hooks/useMediaGallery';
import { InfiniteScroll } from '../../../components/common/InfiniteScroll';

export const MediaGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { mediaItems, hasMore, loadMore } = useMediaGallery();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-fjs-gold">Event Moments</h2>
            <p className="text-fjs-silver mt-2">Share your favorite moments</p>
          </div>
          <MediaUploadButton />
        </div>

        <InfiniteScroll
          loadMore={loadMore}
          hasMore={hasMore}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mediaItems.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </motion.section>
  );
};