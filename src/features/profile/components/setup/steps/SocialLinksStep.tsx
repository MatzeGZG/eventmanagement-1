import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';
import { SocialLink } from '../../../types';

interface SocialLinksForm {
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const SocialLinksStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { register, handleSubmit } = useForm<SocialLinksForm>();

  const onSubmit = (data: SocialLinksForm) => {
    const links: SocialLink[] = Object.entries(data.socialLinks)
      .filter(([_, url]) => url)
      .map(([platform, url]) => ({
        platform: platform as SocialLink['platform'],
        url
      }));
    
    // Handle form submission
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-fjs-silver">
        Connect your social media accounts to enhance your profile and find friends.
      </p>

      <div className="space-y-4">
        <SocialInput
          icon={<Twitter />}
          label="Twitter"
          placeholder="twitter.com/username"
          {...register('socialLinks.twitter')}
        />

        <SocialInput
          icon={<Facebook />}
          label="Facebook"
          placeholder="facebook.com/username"
          {...register('socialLinks.facebook')}
        />

        <SocialInput
          icon={<Instagram />}
          label="Instagram"
          placeholder="instagram.com/username"
          {...register('socialLinks.instagram')}
        />

        <SocialInput
          icon={<Linkedin />}
          label="LinkedIn"
          placeholder="linkedin.com/in/username"
          {...register('socialLinks.linkedin')}
        />
      </div>

      <StepButtons onNext={handleSubmit(onSubmit)} onBack={onBack} />
    </form>
  );
};

interface SocialInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
}

const SocialInput: React.FC<SocialInputProps> = ({
  icon,
  label,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-fjs-silver mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fjs-gold">
        {icon}
      </div>
      <input
        type="text"
        className="w-full bg-black/30 text-white pl-12 pr-4 py-2 rounded-lg 
                   focus:ring-2 focus:ring-fjs-gold"
        {...props}
      />
    </div>
  </div>
);