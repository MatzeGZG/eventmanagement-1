```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { chatService } from '../services/chatService';
import { usePoints } from '../../../hooks/usePoints';

export const useReactions = (messageId: string) => {
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const { awardPoints } = usePoints();
  const user = useStore(state => state.user);

  const toggleReaction = useCallback(async (emoji: string) => {
    if (!user) return;

    try {
      const updatedReactions = { ...reactions };
      const users = updatedReactions[emoji] || [];
      const userIndex = users.indexOf(user.id);

      if (userIndex >= 0) {
        // Remove reaction
        users.splice(userIndex, 1);
        if (users.length === 0) {
          delete updatedReactions[emoji];
        } else {
          updatedReactions[emoji] = users;
        }
      } else {
        // Add reaction
        updatedReactions[emoji] = [...users, user.id];
        awardPoints(2); // Small point reward for engagement
      }

      await chatService.updateMessageReactions(messageId, updatedReactions);
      setReactions(updatedReactions);
    } catch (error) {
      console.error('Failed to update reaction:', error);
    }
  }, [messageId, reactions, user, awardPoints]);

  const hasReacted = useCallback((emoji: string) => {
    if (!user) return false;
    return reactions[emoji]?.includes(user.id) || false;
  }, [reactions, user]);

  return {
    reactions,
    toggleReaction,
    hasReacted
  };
};
```