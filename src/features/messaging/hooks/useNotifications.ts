```typescript
import { useCallback } from 'react';
import { useStore } from '../../../store';
import { Message, NotificationPreferences } from '../types';

export const useNotifications = () => {
  const user = useStore(state => state.user);

  const showNotification = useCallback((message: Message) => {
    if (!user?.notificationPreferences?.desktop) return;

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Message', {
        body: message.content,
        icon: '/funjet-setter-logo.png'
      });
    }
  }, [user]);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const updatePreferences = useCallback((preferences: Partial<NotificationPreferences>) => {
    if (!user) return;

    // Update user preferences in store/backend
    console.log('Updating notification preferences:', preferences);
  }, [user]);

  return {
    showNotification,
    requestPermission,
    updatePreferences,
    preferences: user?.notificationPreferences
  };
};
```