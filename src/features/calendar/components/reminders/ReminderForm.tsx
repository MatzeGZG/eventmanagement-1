```typescript
import React from 'react';
import { Bell, Mail, Clock } from 'lucide-react';
import { ReminderSettings } from '../../hooks/useReminders';

interface ReminderFormProps {
  onSubmit: (settings: ReminderSettings) => void;
  onCancel: () => void;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [settings, setSettings] = React.useState<ReminderSettings>({
    type: 'both',
    timing: 30,
    enabled: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Reminder Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="push"
              checked={settings.type === 'push'}
              onChange={e => setSettings({ ...settings, type: 'push' })}
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
              checked={settings.type === 'email'}
              onChange={e => setSettings({ ...settings, type: 'email' })}
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
              checked={settings.type === 'both'}
              onChange={e => setSettings({ ...settings, type: 'both' })}
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
            value={settings.timing}
            onChange={e => setSettings({ ...settings, timing: Number(e.target.value) })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            <option value="5">5 minutes before</option>
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
            <option value="1440">1 day before</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-fjs-silver hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-fjs-gold text-black rounded-lg hover:bg-fjs-light-gold transition-colors"
        >
          Set Reminder
        </button>
      </div>
    </form>
  );
};
```