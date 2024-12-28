import React from 'react';
import { FeedList } from '../list/FeedList';
import { FeedFilters } from '../filters/FeedFilters';
import { useFeed } from '../../hooks/useFeed';
import { ErrorBoundary } from '../../../../components/common/ErrorBoundary';
import { ErrorLogger } from '../../../../utils/errorHandling/errorLogger';

export const FeedContainer: React.FC = () => {
  const { feedItems, loading, hasMore, loadMore, filters, updateFilters } = useFeed();

  const handleError = (error: Error) => {
    ErrorLogger.log('FEED_CONTAINER_ERROR', 'Feed container error', { error });
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className="space-y-6">
        <FeedFilters filters={filters} onFiltersChange={updateFilters} />
        <FeedList
          items={feedItems}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
    </ErrorBoundary>
  );
};