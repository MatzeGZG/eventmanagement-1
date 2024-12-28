```typescript
import { useState, useCallback } from 'react';
import { Event } from '../../../types/event';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

interface NotificationPreference {
  type: 'email' | 'push' | 'both';
  timing: number; // minutes before event
  enabled: boolean;
}

export const useEventNotifications = (eventId: string) => {
  const [preferences, setPreferences] = useState<NotificationPreference>({
    type: 'both',
    timing: 60,
    enabled: true
  });
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const scheduleNotification = useCallback(async (event: Event) => {
    if (!preferences.enabled) return;

    try {
      // Request notification permission if needed
      if (preferences.type !== 'email' && Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Notification permission denied');
        }
      }

      // Calculate notification time
      const notificationTime = new Date(event.date.getTime() - preferences.timing * 60000);

      // Schedule notification
      const timerId = setTimeout(() => {
        if (preferences.type === 'push' || preferences.type === 'both') {
          new Notification('Event Reminder', {
            body: `${event.title} starts in ${preferences.timing} minutes`,
            icon: event.images[0]
          });
        }

        // Award points for attending
        awardPoints(10);
      }, notificationTime.getTime() - Date.now());

      showToast('Reminder set successfully', 'success');
      return timerId;
    } catch (error) {
      showToast('Failed to set reminder', 'error');
      throw error;
    }
  }, [preferences, showToast, awardPoints]);

  const updatePreferences = useCallback((updates: Partial<NotificationPreference>) => {
    setPreferences(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  return {
    preferences,
    updatePreferences,
    scheduleNotification
  };
};
```