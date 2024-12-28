```typescript
import { useCallback } from 'react';
import { useStore } from '../../../store';
import { Badge } from '../types';
import { useMembership } from './useMembership';

export const useRewards = () => {
  const { user, addBadge } = useStore();
  const { getCurrentTier } = useMembership();

  const checkForRewards = useCallback((activity: string) => {
    if (!user) return;

    const rewards: Badge[] = [];
    const currentTier = getCurrentTier();

    // Activity-based badges
    switch (activity) {
      case 'event_attendance':
        const attendedEvents = user.attendedEvents?.length || 0;
        if (attendedEvents === 1) {
          rewards.push({
            id: 'first-event',
            name: 'First Event',
            description: 'Attended your first event',
            icon: '🎉',
            tier: 'Bronze',
            unlockedAt: new Date()
          });
        } else if (attendedEvents === 10) {
          rewards.push({
            id: 'event-enthusiast',
            name: 'Event Enthusiast',
            description: 'Attended 10 events',
            icon: '🌟',
            tier: 'Silver',
            unlockedAt: new Date()
          });
        }
        break;

      case 'streak':
        if (user.currentStreak === 7) {
          rewards.push({
            id: 'weekly-warrior',
            name: 'Weekly Warrior',
            description: 'Maintained a 7-day activity streak',
            icon: '🔥',
            tier: 'Silver',
            unlockedAt: new Date()
          });
        }
        break;
    }

    // Award badges
    rewards.forEach(badge => {
      if (!user.badges.some(b => b.id === badge.id)) {
        addBadge(badge);
      }
    });

    return rewards;
  }, [user, addBadge, getCurrentTier]);

  return {
    checkForRewards
  };
};
```