```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings } from 'lucide-react';
import { useStore } from '../../../../store';

export const NotificationPreferences: React.FC = () => {
  const user = useStore(state => state.user);

  const preferences = {
    eventReminders: true,
    eventUpdates: true,
    friendsAttending: true,
    priceDrops: true
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    // Update user preferences in store/backend
  };

  return (
    <div className="bg-fjs-charcoal rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="w-6 h-6 text-fjs-gold mr-2" />
          <h3 className="text-xl font-semibold text-white">
            Notification Settings
          </h3>
        </div>
        <Settings className="w-5 h-5 text-fjs-silver" />
      </div>

      <div className="space-y-4">
        <PreferenceToggle
          label="Event Reminders"
          description="Get notified before events start"
          checked={preferences.eventReminders}
          onChange={value => updatePreference('eventReminders', value)}
        />

        <PreferenceToggle
          label="Event Updates"
          description="Notifications about changes to events you're attending"
          checked={preferences.eventUpdates}
          onChange={value => updatePreference('eventUpdates', value)}
        />

        <PreferenceToggle
          label="Friends Attending"
          description="Know when friends RSVP to events"
          checked={preferences.friendsAttending}
          onChange={value => updatePreference('friendsAttending', value)}
        />

        <PreferenceToggle
          label="Price Drops"
          description="Get notified about ticket price reductions"
          checked={preferences.priceDrops}
          onChange={value => updatePreference('priceDrops', value)}
        />
      </div>
    </div>
  );
};

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
  label,
  description,
  checked,
  onChange
}) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="font-medium text-white">{label}</h4>
      <p className="text-sm text-fjs-silver">{description}</p>
    </div>
    <motion.button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-fjs-gold' : 'bg-fjs-charcoal'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </motion.button>
  </div>
);
```