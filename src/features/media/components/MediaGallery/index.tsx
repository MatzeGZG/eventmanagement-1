import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GalleryHeader } from './GalleryHeader';
import { GalleryGrid } from './GalleryGrid';
import { useMediaGallery } from '../../hooks/useMediaGallery';
import { GalleryFilters } from './GalleryFilters';
import { GalleryEmptyState } from './GalleryEmptyState';
import { GalleryLoadingState } from './GalleryLoadingState';

export const MediaGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { mediaItems, hasMore, loading, loadMore, filters, updateFilters } = useMediaGallery();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryHeader />
        <GalleryFilters filters={filters} onFiltersChange={updateFilters} />
        
        {loading && <GalleryLoadingState />}
        
        {!loading && mediaItems.length === 0 && <GalleryEmptyState />}
        
        {!loading && mediaItems.length > 0 && (
          <GalleryGrid 
            items={mediaItems}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        )}
      </div>
    </motion.section>
  );
};