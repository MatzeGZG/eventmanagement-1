```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Users, Bell } from 'lucide-react';
import { PrivacySettingsForm } from '../privacy/PrivacySettingsForm';
import { SocialScanningButton } from '../social/SocialScanningButton';
import { NotificationPreferences } from './NotificationPreferences';
import { useProfileSettings } from '../../hooks/useProfileSettings';

export const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'notifications' | 'social'>('privacy');
  const { settings, chatAccess, updateSettings, updateChatAccess } = useProfileSettings();

  const tabs = [
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'social', label: 'Social', icon: Users }
  ] as const;

  return (
    <div className="bg-black rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="w-6 h-6 text-fjs-gold mr-2" />
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
        </div>
        <SocialScanningButton />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-fjs-gold text-black'
                : 'text-fjs-silver hover:bg-fjs-charcoal'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatedTabPanel>
        {activeTab === 'privacy' && (
          <PrivacySettingsForm
            settings={settings}
            chatAccess={chatAccess}
            onSettingsChange={updateSettings}
            onChatAccessChange={updateChatAccess}
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationPreferences />
        )}
        {activeTab === 'social' && (
          <div className="text-fjs-silver">
            Social settings content
          </div>
        )}
      </AnimatedTabPanel>
    </div>
  );
};

const AnimatedTabPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
```