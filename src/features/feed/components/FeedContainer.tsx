```typescript
import React from 'react';
import { FeedList } from './FeedList';
import { FeedFilters } from './FeedFilters';
import { useFeed } from '../hooks/useFeed';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary';
import { ErrorLogger } from '../../../utils/errorHandling/errorLogger';

export const FeedContainer: React.FC = () => {
  const { feedItems, loading, hasMore, loadMore, filters, updateFilters } = useFeed();

  const handleError = (error: Error) => {
    ErrorLogger.log('FEED_CONTAINER_ERROR', 'Feed container error', { error });
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeedFilters filters={filters} onFiltersChange={updateFilters} />
        <div className="mt-6">
          <FeedList
            items={feedItems}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};
```