import { useState, useCallback } from 'react';
import { EventReminder } from '../types';

export const useReminders = () => {
  const [reminders, setReminders] = useState({
    confirmation: 'Thank you for registering for {{event.name}}!',
    reminder: 'Your event {{event.name}} is starting in {{time}}.',
    followUp: 'Thank you for attending {{event.name}}. Please leave a review!'
  });

  const updateReminder = useCallback((
    type: keyof typeof reminders,
    template: string,
    timing?: number
  ) => {
    setReminders(prev => ({
      ...prev,
      [type]: template
    }));
  }, []);

  const scheduleReminder = useCallback((
    eventId: string,
    type: 'confirmation' | 'reminder' | 'followUp',
    scheduledFor: Date
  ) => {
    // Implementation for scheduling reminders
    console.log('Scheduling reminder:', { eventId, type, scheduledFor });
  }, []);

  return {
    reminders,
    updateReminder,
    scheduleReminder
  };
};