```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { PrivacySettings, ChatAccessLevels } from '../types';

export const useProfileSettings = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    allowMessagesFrom: 'everyone',
    showOnlineStatus: true,
    allowTagging: true,
    showLocation: true
  });

  const [chatAccess, setChatAccess] = useState<ChatAccessLevels>({
    directMessages: 'everyone',
    groupChats: 'public',
    eventChats: 'participants'
  });

  const { showToast } = useToast();

  const updateSettings = useCallback(async (updates: Partial<PrivacySettings>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ privacy_settings: { ...settings, ...updates } })
        .single();

      if (error) throw error;

      setSettings(prev => ({ ...prev, ...updates }));
      showToast('Settings updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update settings', 'error');
    }
  }, [settings, showToast]);

  const updateChatAccess = useCallback(async (updates: Partial<ChatAccessLevels>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ chat_access: { ...chatAccess, ...updates } })
        .single();

      if (error) throw error;

      setChatAccess(prev => ({ ...prev, ...updates }));
      showToast('Chat settings updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update chat settings', 'error');
    }
  }, [chatAccess, showToast]);

  return {
    settings,
    chatAccess,
    updateSettings,
    updateChatAccess
  };
};
```