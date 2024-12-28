```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';
import { TagPreference } from '../types';
import { supabase } from '../../../lib/supabase';

export const useTagPreferences = () => {
  const [loading, setLoading] = useState(false);
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  const fetchPreferences = useCallback(async () => {
    if (!user) return [];
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_tag_preferences')
        .select(`
          *,
          tag:tags(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    } catch (error) {
      showToast('Failed to load tag preferences', 'error');
      return [];
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  const updatePreference = useCallback(async (
    tagId: string,
    preferenceLevel: number
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_tag_preferences')
        .upsert({
          user_id: user.id,
          tag_id: tagId,
          preference_level: preferenceLevel,
          interaction_count: 1,
          last_interaction: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Preferences updated', 'success');
    } catch (error) {
      showToast('Failed to update preferences', 'error');
      throw error;
    }
  }, [user, showToast]);

  return {
    loading,
    fetchPreferences,
    updatePreference
  };
};
```