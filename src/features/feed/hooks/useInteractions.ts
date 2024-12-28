```typescript
import { useCallback } from 'react';
import { usePoints } from '../../../hooks/usePoints';
import { FeedItem } from '../types';

export const useInteractions = () => {
  const { awardPoints } = usePoints();

  const handleLike = useCallback((item: FeedItem) => {
    awardPoints(5); // Award points for engagement
  }, [awardPoints]);

  const handleComment = useCallback((item: FeedItem) => {
    awardPoints(10); // Award points for commenting
  }, [awardPoints]);

  const handleShare = useCallback((item: FeedItem) => {
    awardPoints(15); // Award points for sharing
  }, [awardPoints]);

  return {
    handleLike,
    handleComment,
    handleShare
  };
};
```