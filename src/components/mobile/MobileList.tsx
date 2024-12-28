import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface MobileListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  pullToRefresh?: boolean;
  onRefresh?: () => void;
}

export const MobileList = <T extends { id: string }>({
  items,
  renderItem,
  onLoadMore,
  loading,
  hasMore,
  pullToRefresh,
  onRefresh
}: MobileListProps<T>) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {pullToRefresh && onRefresh && (
        <div className="py-2 text-center text-fjs-silver text-sm">
          Pull to refresh
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto ios-momentum-scroll">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
        
        {loading && (
          <div className="p-4 flex justify-center">
            <LoadingSpinner size="sm" />
          </div>
        )}
        
        <div ref={ref} className="h-20" />
      </div>
    </div>
  );
};