```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

export const useReadReceipts = (messageId: string) => {
  const [readBy, setReadBy] = useState<string[]>([]);

  const markAsRead = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('chat_message_reads')
        .upsert({
          message_id: messageId,
          user_id: user.id,
          read_at: new Date().toISOString()
        });

      if (error) throw error;
      setReadBy(prev => [...prev, user.id]);
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  }, [messageId]);

  return {
    readBy,
    markAsRead
  };
};
```