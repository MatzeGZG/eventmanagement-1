```typescript
import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { TemplateConfig } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useTemplateManager = () => {
  const { showToast } = useToast();

  const saveTemplate = useCallback(async (template: TemplateConfig) => {
    try {
      const { error } = await supabase
        .from('templates')
        .upsert({
          ...template,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Template saved successfully', 'success');
    } catch (error) {
      showToast('Failed to save template', 'error');
      throw error;
    }
  }, [showToast]);

  const duplicateTemplate = useCallback(async (template: TemplateConfig) => {
    try {
      const newTemplate = {
        ...template,
        id: undefined,
        name: `${template.name} (Copy)`,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('templates')
        .insert(newTemplate);

      if (error) throw error;
      showToast('Template duplicated successfully', 'success');
    } catch (error) {
      showToast('Failed to duplicate template', 'error');
      throw error;
    }
  }, [showToast]);

  return {
    saveTemplate,
    duplicateTemplate
  };
};
```