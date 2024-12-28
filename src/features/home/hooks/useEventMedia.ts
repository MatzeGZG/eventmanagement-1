import { useState, useEffect } from 'react';
import { MediaItem } from '../../../types';
import { TEST_MEDIA_ITEMS } from '../../../data/testMedia';

export const useEventMedia = (userId?: string) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // In production, this would fetch from your API
        // For now, using test data filtered by user attendance
        const userMedia = TEST_MEDIA_ITEMS.filter(item => 
          item.author === userId
        );
        setMediaItems(userMedia);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [userId]);

  return { mediaItems, loading };
};