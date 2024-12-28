```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';

interface NotificationPreference {
  enabled: boolean;
  email: boolean;
  push: boolean;
}

type NotificationPreferences = Record<string, NotificationPreference>;

export const useNotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    events: { enabled: true, email: true, push: true },
    messages: { enabled: true, email: false, push: true },
    achievements: { enabled: true, email: true, push: true },
    social: { enabled: true, email: true, push: true }
  });

  const { showToast } = useToast();

  const updatePreferences = useCallback(async (
    type: string,
    updates: Partial<NotificationPreference>
  ) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          notification_preferences: {
            ...preferences,
            [type]: { ...preferences[type], ...updates }
          }
        })
        .single();

      if (error) throw error;

      setPreferences(prev => ({
        ...prev,
        [type]: { ...prev[type], ...updates }
      }));

      showToast('Notification preferences updated', 'success');
    } catch (error) {
      showToast('Failed to update notification preferences', 'error');
    }
  }, [preferences, showToast]);

  return {
    preferences,
    updatePreferences
  };
};
```