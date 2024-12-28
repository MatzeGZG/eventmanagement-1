```typescript
import { useState, useCallback } from 'react';
import { Event } from '../../../types/event';
import { useToast } from '../../../hooks/useToast';

export interface ReminderSettings {
  type: 'email' | 'push' | 'both';
  timing: number; // minutes before event
  enabled: boolean;
}

export const useReminders = () => {
  const [reminders, setReminders] = useState<Map<string, ReminderSettings[]>>(new Map());
  const { showToast } = useToast();

  const addReminder = useCallback(async (
    event: Event,
    settings: ReminderSettings
  ) => {
    try {
      // Request notification permission if needed
      if (settings.type !== 'email' && Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Notification permission denied');
        }
      }

      setReminders(prev => {
        const eventReminders = prev.get(event.id) || [];
        const updated = new Map(prev);
        updated.set(event.id, [...eventReminders, settings]);
        return updated;
      });

      // Schedule the reminder
      scheduleReminder(event, settings);
      
      showToast('Reminder set successfully', 'success');
    } catch (error) {
      showToast('Failed to set reminder', 'error');
    }
  }, [showToast]);

  const removeReminder = useCallback((eventId: string, index: number) => {
    setReminders(prev => {
      const eventReminders = prev.get(eventId) || [];
      const updated = new Map(prev);
      updated.set(eventId, eventReminders.filter((_, i) => i !== index));
      return updated;
    });
  }, []);

  const scheduleReminder = useCallback((
    event: Event,
    settings: ReminderSettings
  ) => {
    const reminderTime = new Date(event.date.getTime() - settings.timing * 60000);
    const now = new Date();

    if (reminderTime > now) {
      const timeoutId = setTimeout(() => {
        if (settings.type === 'push' || settings.type === 'both') {
          new Notification(`Upcoming Event: ${event.title}`, {
            body: `Starting in ${settings.timing} minutes`,
            icon: '/path-to-icon.png'
          });
        }

        if (settings.type === 'email' || settings.type === 'both') {
          // TODO: Implement email notification
          console.log('Sending email reminder:', event.title);
        }
      }, reminderTime.getTime() - now.getTime());

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return {
    reminders,
    addReminder,
    removeReminder
  };
};
```