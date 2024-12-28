import React from 'react';
import { Shield, Users, MessageCircle, MapPin, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';
import { PrivacySettings } from '../../../types';

export const PrivacyStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { register, handleSubmit } = useForm<PrivacySettings>();

  const onSubmit = (data: PrivacySettings) => {
    // Handle form submission
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-fjs-silver">
        Control who can see your profile and how others can interact with you.
      </p>

      <div className="space-y-6">
        <PrivacyOption
          icon={<Users />}
          label="Profile Visibility"
          description="Who can see your profile"
        >
          <select
            {...register('profileVisibility')}
            className="w-full bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-fjs-gold"
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
            {...register('allowMessagesFrom')}
            className="w-full bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-fjs-gold"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </PrivacyOption>

        <PrivacyToggle
          {...register('showOnlineStatus')}
          icon={<Shield />}
          label="Online Status"
          description="Show when you're active on FunJetSetter"
        />

        <PrivacyToggle
          {...register('allowTagging')}
          icon={<Tag />}
          label="Photo Tagging"
          description="Allow others to tag you in photos"
        />

        <PrivacyToggle
          {...register('showLocation')}
          icon={<MapPin />}
          label="Location Sharing"
          description="Share your location with other users"
        />
      </div>

      <StepButtons onNext={handleSubmit(onSubmit)} onBack={onBack} />
    </form>
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

interface PrivacyToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  icon,
  label,
  description,
  ...props
}) => (
  <div className="flex items-start space-x-4">
    <div className="text-fjs-gold">{icon}</div>
    <div className="flex-1">
      <label className="block font-medium text-white mb-1">{label}</label>
      <p className="text-sm text-fjs-silver">{description}</p>
    </div>
    <div className="flex items-center h-6">
      <input
        type="checkbox"
        className="h-4 w-4 text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
        {...props}
      />
    </div>
  </div>
);