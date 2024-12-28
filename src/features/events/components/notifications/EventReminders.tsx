```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Clock } from 'lucide-react';
import { useEventNotifications } from '../../hooks/useEventNotifications';
import { Event } from '../../../../types/event';

interface EventRemindersProps {
  event: Event;
}

export const EventReminders: React.FC<EventRemindersProps> = ({ event }) => {
  const { preferences, updatePreferences, scheduleNotification } = useEventNotifications(event.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await scheduleNotification(event);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Reminder Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="push"
              checked={preferences.type === 'push'}
              onChange={e => updatePreferences({ type: 'push' })}
              className="text-fjs-gold focus:ring-fjs-gold"
            />
            <span className="text-white flex items-center">
              <Bell className="w-4 h-4 mr-1" />
              Push Notification
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="email"
              checked={preferences.type === 'email'}
              onChange={e => updatePreferences({ type: 'email' })}
              className="text-fjs-gold focus:ring-fjs-gold"
            />
            <span className="text-white flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="both"
              checked={preferences.type === 'both'}
              onChange={e => updatePreferences({ type: 'both' })}
              className="text-fjs-gold focus:ring-fjs-gold"
            />
            <span className="text-white">Both</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Remind Me
        </label>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-fjs-gold" />
          <select
            value={preferences.timing}
            onChange={e => updatePreferences({ timing: Number(e.target.value) })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            <option value={5}>5 minutes before</option>
            <option value={15}>15 minutes before</option>
            <option value={30}>30 minutes before</option>
            <option value={60}>1 hour before</option>
            <option value={1440}>1 day before</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={preferences.enabled}
            onChange={e => updatePreferences({ enabled: e.target.checked })}
            className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
          />
          <span className="text-white">Enable reminders</span>
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!preferences.enabled}
          className="px-4 py-2 bg-fjs-gold text-black rounded-lg font-medium disabled:opacity-50"
        >
          Set Reminder
        </motion.button>
      </div>
    </form>
  );
};
```