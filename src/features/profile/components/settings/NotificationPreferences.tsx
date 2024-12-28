```tsx
import React from 'react';
import { Bell, Calendar, MessageCircle, Award, Users } from 'lucide-react';
import { useNotificationPreferences } from '../../hooks/useNotificationPreferences';

export const NotificationPreferences: React.FC = () => {
  const { preferences, updatePreferences } = useNotificationPreferences();

  const notificationTypes = [
    {
      id: 'events',
      label: 'Event Notifications',
      description: 'Updates about events you're interested in',
      icon: Calendar
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Direct messages and chat notifications',
      icon: MessageCircle
    },
    {
      id: 'achievements',
      label: 'Achievements',
      description: 'When you earn badges or level up',
      icon: Award
    },
    {
      id: 'social',
      label: 'Social Updates',
      description: 'Connection requests and friend activity',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notificationTypes.map(({ id, label, description, icon: Icon }) => (
          <div key={id} className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg">
            <Icon className="w-5 h-5 text-fjs-gold mt-1" />
            <div className="flex-1">
              <label className="flex items-center justify-between">
                <div>
                  <span className="block text-white font-medium">{label}</span>
                  <span className="text-sm text-fjs-silver">{description}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {preferences[id]?.email && (
                    <Bell className="w-4 h-4 text-fjs-gold" />
                  )}
                  <input
                    type="checkbox"
                    checked={preferences[id]?.enabled}
                    onChange={(e) => updatePreferences(id, { enabled: e.target.checked })}
                    className="h-4 w-4 text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                  />
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```