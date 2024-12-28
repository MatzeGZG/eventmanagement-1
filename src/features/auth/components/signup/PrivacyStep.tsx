import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, MessageCircle, MapPin, Tag } from 'lucide-react';
import { StepProps } from './types';
import { StepButtons } from '../StepButtons';

export const PrivacyStep: React.FC<StepProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  onBack,
  isLastStep 
}) => {
  const handleSettingChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      privacySettings: {
        ...formData.privacySettings,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-fjs-silver">
        Control your privacy settings and how others can interact with you.
      </p>

      <div className="space-y-6">
        <PrivacyOption
          icon={<Users />}
          label="Profile Visibility"
          description="Who can see your profile"
        >
          <select
            value={formData.privacySettings.profileVisibility}
            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </PrivacyOption>

        <PrivacyOption
          icon={<MessageCircle />}
          label="Message Settings"
          description="Control who can send you messages"
        >
          <select
            value={formData.privacySettings.allowMessagesFrom}
            onChange={(e) => handleSettingChange('allowMessagesFrom', e.target.value)}
            className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </PrivacyOption>

        <PrivacyToggle
          icon={<Shield />}
          label="Show Online Status"
          description="Let others see when you're active"
          checked={formData.privacySettings.showOnlineStatus}
          onChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
        />

        <PrivacyToggle
          icon={<Tag />}
          label="Allow Tagging"
          description="Let others tag you in photos and posts"
          checked={formData.privacySettings.allowTagging}
          onChange={(checked) => handleSettingChange('allowTagging', checked)}
        />

        <PrivacyToggle
          icon={<MapPin />}
          label="Share Location"
          description="Show your location to other users"
          checked={formData.privacySettings.showLocation}
          onChange={(checked) => handleSettingChange('showLocation', checked)}
        />
      </div>

      <StepButtons 
        onNext={onNext} 
        onBack={onBack}
        isLastStep={isLastStep}
      />
    </div>
  );
};

interface PrivacyOptionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}

const PrivacyOption: React.FC<PrivacyOptionProps> = ({
  icon,
  label,
  description,
  children
}) => (
  <div className="flex items-start space-x-4">
    <div className="text-fjs-gold">{icon}</div>
    <div className="flex-1">
      <label className="block font-medium text-white mb-1">{label}</label>
      <p className="text-sm text-fjs-silver mb-2">{description}</p>
      {children}
    </div>
  </div>
);

interface PrivacyToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  icon,
  label,
  description,
  checked,
  onChange
}) => (
  <div className="flex items-start space-x-4">
    <div className="text-fjs-gold">{icon}</div>
    <div className="flex-1">
      <label className="block font-medium text-white mb-1">{label}</label>
      <p className="text-sm text-fjs-silver">{description}</p>
    </div>
    <div className="flex items-center h-6">
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
  </div>
);