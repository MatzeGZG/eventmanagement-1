```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Message } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useMessageThread = (parentMessageId: string) => {
  const [replies, setReplies] = useState<Message[]>([]);
  const { showToast } = useToast();

  const loadReplies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('reply_to', parentMessageId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data);
    } catch (error) {
      showToast('Failed to load replies', 'error');
    }
  }, [parentMessageId, showToast]);

  const sendReply = useCallback(async (content: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          content,
          reply_to: parentMessageId,
          type: 'text'
        }])
        .select()
        .single();

      if (error) throw error;
      setReplies(prev => [...prev, data]);
      showToast('Reply sent', 'success');
    } catch (error) {
      showToast('Failed to send reply', 'error');
    }
  }, [parentMessageId, showToast]);

  return {
    replies,
    sendReply,
    loadReplies
  };
};
```