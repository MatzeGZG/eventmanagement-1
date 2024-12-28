```typescript
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Forum } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useForums = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadForums = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('forums')
        .select(`
          *,
          posts:forum_posts(count),
          participants:forum_participants(count)
        `)
        .order('last_activity_at', { ascending: false });

      if (error) throw error;

      const processedForums = data.map(forum => ({
        ...forum,
        postCount: forum.posts[0]?.count || 0,
        participantCount: forum.participants[0]?.count || 0,
        isHot: forum.posts[0]?.count > 100 || forum.participants[0]?.count > 50
      }));

      setForums(processedForums);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load forums';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadForums();
  }, [loadForums]);

  return {
    forums,
    loading,
    error,
    refresh: loadForums
  };
};
```