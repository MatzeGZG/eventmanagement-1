import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MessageCircle, Users, Eye, Tag, MapPin } from 'lucide-react';
import { PrivacySettings, ChatAccessLevels } from '../../types';

interface PrivacySettingsFormProps {
  settings: PrivacySettings;
  chatAccess: ChatAccessLevels;
  onSettingsChange: (settings: Partial<PrivacySettings>) => void;
  onChatAccessChange: (settings: Partial<ChatAccessLevels>) => void;
}

export const PrivacySettingsForm: React.FC<PrivacySettingsFormProps> = ({
  settings,
  chatAccess,
  onSettingsChange,
  onChatAccessChange
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Visibility */}
        <SettingSection
          icon={Eye}
          title="Profile Visibility"
          description="Control who can see your profile"
        >
          <select
            value={settings.profileVisibility}
            onChange={(e) => onSettingsChange({ profileVisibility: e.target.value as any })}
            className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </SettingSection>

        {/* Chat Access */}
        <SettingSection
          icon={MessageCircle}
          title="Message Settings"
          description="Control who can message you"
        >
          <select
            value={chatAccess.directMessages}
            onChange={(e) => onChatAccessChange({ directMessages: e.target.value as any })}
            className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </SettingSection>

        {/* Age Restriction */}
        <SettingSection
          icon={Shield}
          title="Age Settings"
          description="Set age-appropriate restrictions"
        >
          <select
            value={settings.ageRestriction || 0}
            onChange={(e) => onSettingsChange({ ageRestriction: Number(e.target.value) })}
            className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          >
            <option value={0}>No Restriction</option>
            <option value={13}>13+</option>
            <option value={18}>18+</option>
            <option value={21}>21+</option>
          </select>
        </SettingSection>

        {/* Additional Settings */}
        <SettingSection
          icon={Users}
          title="Additional Settings"
          description="Manage other privacy options"
        >
          <div className="space-y-3">
            <ToggleSetting
              label="Show Online Status"
              checked={settings.showOnlineStatus}
              onChange={(checked) => onSettingsChange({ showOnlineStatus: checked })}
            />
            <ToggleSetting
              label="Allow Tagging"
              checked={settings.allowTagging}
              onChange={(checked) => onSettingsChange({ allowTagging: checked })}
            />
            <ToggleSetting
              label="Share Location"
              checked={settings.showLocation}
              onChange={(checked) => onSettingsChange({ showLocation: checked })}
            />
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

const SettingSection: React.FC<{
  icon: React.FC<any>;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, description, children }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-fjs-gold" />
      <div>
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-fjs-silver">{description}</p>
      </div>
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

const ToggleSetting: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-white">{label}</span>
    <motion.button
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-fjs-gold' : 'bg-fjs-charcoal'
      }`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </motion.button>
  </label>
);