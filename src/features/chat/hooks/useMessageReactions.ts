```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useMessageReactions = (messageId: string) => {
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const toggleReaction = useCallback(async (emoji: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updatedReactions = { ...reactions };
      const users = updatedReactions[emoji] || [];
      const userIndex = users.indexOf(user.id);

      if (userIndex >= 0) {
        users.splice(userIndex, 1);
        if (users.length === 0) {
          delete updatedReactions[emoji];
        } else {
          updatedReactions[emoji] = users;
        }
      } else {
        updatedReactions[emoji] = [...users, user.id];
        awardPoints(1); // Small reward for engagement
      }

      const { error } = await supabase
        .from('chat_messages')
        .update({ reactions: updatedReactions })
        .eq('id', messageId);

      if (error) throw error;
      setReactions(updatedReactions);
    } catch (error) {
      showToast('Failed to update reaction', 'error');
    }
  }, [messageId, reactions, awardPoints, showToast]);

  return {
    reactions,
    toggleReaction
  };
};
```