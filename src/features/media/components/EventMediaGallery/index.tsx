import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MediaGrid } from './MediaGrid';
import { MediaFilters } from './MediaFilters';
import { useEventMedia } from '../../hooks/useEventMedia';

export const EventMediaGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { mediaItems, loading, hasMore, loadMore, filters, updateFilters } = useEventMedia();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <MediaFilters filters={filters} onFiltersChange={updateFilters} />
      <MediaGrid 
        items={mediaItems}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </motion.section>
  );
};