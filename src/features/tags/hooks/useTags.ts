```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';
import { Tag, TagCategory } from '../types';
import { supabase } from '../../../lib/supabase';

export const useTags = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchTags = useCallback(async (categoryId?: string) => {
    setLoading(true);
    try {
      let query = supabase.from('tags').select(`
        *,
        category:tag_categories(*)
      `);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    } catch (error) {
      showToast('Failed to load tags', 'error');
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const addTag = useCallback(async (tag: Omit<Tag, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([tag])
        .select()
        .single();

      if (error) throw error;
      showToast('Tag added successfully', 'success');
      return data;
    } catch (error) {
      showToast('Failed to add tag', 'error');
      throw error;
    }
  }, [showToast]);

  const updateTag = useCallback(async (id: string, updates: Partial<Tag>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      showToast('Tag updated successfully', 'success');
      return data;
    } catch (error) {
      showToast('Failed to update tag', 'error');
      throw error;
    }
  }, [showToast]);

  const deleteTag = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showToast('Tag deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete tag', 'error');
      throw error;
    }
  }, [showToast]);

  return {
    loading,
    fetchTags,
    addTag,
    updateTag,
    deleteTag
  };
};
```