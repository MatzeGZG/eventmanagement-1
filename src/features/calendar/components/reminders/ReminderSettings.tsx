```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Mail } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';
import { CalendarEvent } from '../../types';

interface ReminderSettingsProps {
  event: CalendarEvent;
}

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ event }) => {
  const defaultSettings = {
    defaultTimes: [5, 15, 30, 60, 1440], // 5min, 15min, 30min, 1hr, 1day
    notificationTypes: ['push', 'email'] as const
  };

  const {
    permissions,
    requestPermissions,
    scheduleReminder,
    clearReminder
  } = useReminders(defaultSettings);

  const handleToggleReminder = async (minutesBefore: number) => {
    if (permissions !== 'granted') {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    const reminders = JSON.parse(
      localStorage.getItem('eventReminders') || '{}'
    );
    const eventReminders = reminders[event.id] || {};

    if (eventReminders[minutesBefore]) {
      clearReminder(event.id, minutesBefore);
    } else {
      scheduleReminder(event, minutesBefore);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Bell className="w-5 h-5 text-fjs-gold" />
        <h3 className="text-lg font-semibold text-fjs-gold">
          Reminder Settings
        </h3>
      </div>

      <div className="space-y-3">
        {defaultSettings.defaultTimes.map(minutes => (
          <motion.button
            key={minutes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleToggleReminder(minutes)}
            className="w-full flex items-center justify-between p-3 
                     bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-fjs-silver mr-2" />
              <span className="text-white">
                {minutes < 60 
                  ? `${minutes} minutes before`
                  : minutes === 60
                  ? '1 hour before'
                  : '1 day before'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-fjs-silver" />
              <Bell className="w-4 h-4 text-fjs-silver" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
```