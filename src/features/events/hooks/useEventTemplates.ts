```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { EventTemplate } from '../types/eventTemplate';
import { useToast } from '../../../hooks/useToast';

export const useEventTemplates = () => {
  const [templates, setTemplates] = useState<EventTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('event_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      setTemplates(data);
    } catch (error) {
      showToast('Failed to load templates', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const createTemplate = useCallback(async (template: Omit<EventTemplate, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('event_templates')
        .insert([template])
        .select()
        .single();

      if (error) throw error;
      setTemplates(prev => [...prev, data]);
      showToast('Template created successfully', 'success');
      return data;
    } catch (error) {
      showToast('Failed to create template', 'error');
      throw error;
    }
  }, [showToast]);

  return {
    templates,
    loading,
    loadTemplates,
    createTemplate
  };
};
```