```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';
import { Event } from '../../../types/event';

interface EventSocialState {
  likes: number;
  comments: Comment[];
  shares: number;
  userLiked: boolean;
}

export const useEventSocial = (eventId: string) => {
  const [socialState, setSocialState] = useState<EventSocialState>({
    likes: 0,
    comments: [],
    shares: 0,
    userLiked: false
  });

  const user = useStore(state => state.user);
  const updateEvent = useStore(state => state.updateEvent);
  const { awardPoints } = usePoints();

  const toggleLike = useCallback(async () => {
    if (!user) return;

    try {
      setSocialState(prev => ({
        ...prev,
        likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
        userLiked: !prev.userLiked
      }));

      if (!socialState.userLiked) {
        awardPoints(5); // Award points for engagement
      }

      // Update event in store
      updateEvent({
        id: eventId,
        likes: socialState.userLiked ? socialState.likes - 1 : socialState.likes + 1
      } as Event);

    } catch (error) {
      // Revert state on error
      setSocialState(prev => ({
        ...prev,
        likes: prev.userLiked ? prev.likes + 1 : prev.likes - 1,
        userLiked: !prev.userLiked
      }));
    }
  }, [eventId, user, socialState.userLiked, socialState.likes, awardPoints, updateEvent]);

  const addComment = useCallback(async (content: string) => {
    if (!user) return;

    try {
      const newComment = {
        id: crypto.randomUUID(),
        userId: user.id,
        userName: user.name,
        content,
        timestamp: new Date(),
        likes: 0
      };

      setSocialState(prev => ({
        ...prev,
        comments: [...prev.comments, newComment]
      }));

      awardPoints(10); // Award points for meaningful engagement

    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  }, [user, awardPoints]);

  const shareEvent = useCallback(async (platform: string) => {
    try {
      setSocialState(prev => ({
        ...prev,
        shares: prev.shares + 1
      }));

      awardPoints(15); // Award points for sharing

    } catch (error) {
      console.error('Failed to share event:', error);
    }
  }, [awardPoints]);

  return {
    ...socialState,
    toggleLike,
    addComment,
    shareEvent
  };
};
```