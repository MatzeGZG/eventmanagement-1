import React from 'react';
import { Plane, Home, Compass, Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';
import { TravelPreferences } from '../../../types';

const DESTINATIONS = ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];
const TRAVEL_STYLES = ['Luxury', 'Budget', 'Adventure', 'Cultural', 'Relaxation'];
const ACCOMMODATIONS = ['Hotel', 'Hostel', 'Resort', 'Apartment', 'Camping'];
const INTERESTS = ['Food & Dining', 'History', 'Nature', 'Photography', 'Nightlife', 'Shopping'];

export const TravelPreferencesStep: React.FC<StepProps> = ({ 
  onNext, 
  onBack, 
  onComplete, 
  isLastStep 
}) => {
  const { register, handleSubmit } = useForm<TravelPreferences>();

  const onSubmit = (data: TravelPreferences) => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-fjs-silver">
        Tell us about your travel preferences to help us personalize your experience.
      </p>

      <div className="space-y-6">
        <PreferenceSection
          icon={<Plane />}
          title="Preferred Destinations"
          description="Select regions you're interested in visiting"
        >
          <div className="grid grid-cols-2 gap-3">
            {DESTINATIONS.map(destination => (
              <label key={destination} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={destination}
                  {...register('preferredDestinations')}
                  className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                />
                <span className="text-white">{destination}</span>
              </label>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          icon={<Compass />}
          title="Travel Style"
          description="How do you like to travel?"
        >
          <div className="grid grid-cols-2 gap-3">
            {TRAVEL_STYLES.map(style => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={style}
                  {...register('travelStyle')}
                  className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                />
                <span className="text-white">{style}</span>
              </label>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          icon={<Home />}
          title="Accommodation Preferences"
          description="Where do you prefer to stay?"
        >
          <div className="grid grid-cols-2 gap-3">
            {ACCOMMODATIONS.map(accommodation => (
              <label key={accommodation} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={accommodation}
                  {...register('accommodation')}
                  className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                />
                <span className="text-white">{accommodation}</span>
              </label>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          icon={<Heart />}
          title="Travel Interests"
          description="What do you enjoy most while traveling?"
        >
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(interest => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={interest}
                  {...register('interests')}
                  className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                />
                <span className="text-white">{interest}</span>
              </label>
            ))}
          </div>
        </PreferenceSection>
      </div>

      <StepButtons 
        onNext={handleSubmit(onSubmit)} 
        onBack={onBack}
        onComplete={onComplete}
        isLastStep={isLastStep} 
      />
    </form>
  );
};

interface PreferenceSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  icon,
  title,
  description,
  children
}) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-3">
      <div className="text-fjs-gold">{icon}</div>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-fjs-silver">{description}</p>
      </div>
    </div>
    <div className="ml-9">{children}</div>
  </div>
);