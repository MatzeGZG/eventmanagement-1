export interface ProfessionalInfo {
  profession?: string;
  industry?: string;
  skills: string[];
}

export interface EventPreferences {
  preferredEventTypes: string[];
  preferredTimes: {
    weekday: ('morning' | 'afternoon' | 'evening')[];
    weekend: ('morning' | 'afternoon' | 'evening')[];
  };
  priceRange: {
    min: number;
    max: number;
    preferred: 'budget' | 'medium' | 'premium';
  };
}

export interface SocialPreferences {
  languages: string[];
  networkingGoals: string[];
  preferredGroupSize: 'small' | 'medium' | 'large';
}

export interface TravelPreferences {
  homeLocation: {
    city: string | null;
    country: string | null;
    coordinates: {
      latitude: number;
      longitude: number;
    } | null;
  };
  travelRadius: number;
  preferences: {
    preferredDestinations: string[];
    accommodationTypes: string[];
    transportationModes: string[];
    tripStyles: string[];
    tripDurations: string[];
  };
}

export interface PersonalPreferences {
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  culturalInterests: string[];
}

export interface PersonalityProfile {
  personalityTraits: string[];
  interactionStyle?: 'outgoing' | 'balanced' | 'reserved';
  preferredAgeRange?: {
    min: number | null;
    max: number | null;
  };
}

export interface EnhancedProfile {
  professional: ProfessionalInfo;
  eventPreferences: EventPreferences;
  socialPreferences: SocialPreferences;
  travelPreferences: TravelPreferences;
  personalPreferences: PersonalPreferences;
  personalityProfile: PersonalityProfile;
}