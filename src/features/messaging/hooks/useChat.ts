```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { Message, ChatRoom } from '../types';
import { usePoints } from '../../../hooks/usePoints';
import { useContentModeration } from '../../moderation/hooks/useContentModeration';

export const useChat = () => {
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const user = useStore(state => state.user);
  const { awardPoints } = usePoints();

  const { moderateContent } = useContentModeration({
    enabled: true,
    autoBlock: true,
    minimumConfidence: 0.8,
    flaggedContentCallback: (result) => {
      console.warn('Content moderation flag:', result);
      // TODO: Report to admin dashboard
    }
  });

  const sendMessage = useCallback(async (message: Message) => {
    if (!activeRoom || !user) return;

    // Moderate content before sending
    const moderationResult = await moderateContent(message.content);

    if (!moderationResult.isAllowed) {
      throw new Error(
        moderationResult.reason || 
        'This message cannot be sent as it violates our content guidelines.'
      );
    }

    // Update room with new message
    setRooms(prevRooms => 
      prevRooms.map(room => {
        if (room.id === activeRoom.id) {
          return {
            ...room,
            lastMessage: message,
            unreadCount: 0
          };
        }
        return room;
      })
    );

    // Award points for participation
    if (activeRoom.type === 'group') {
      awardPoints(5);
    }

    // TODO: Implement real-time message sending
  }, [activeRoom, user, awardPoints, moderateContent]);

  // ... rest of the hook implementation
};
```