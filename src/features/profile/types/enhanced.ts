```typescript
// Social engagement metrics
export interface SocialEngagement {
  eventAttendanceRate: number;
  responseTime: number;
  connectionActivity: number;
  communityRating: number;
}

// Communication preferences
export interface CommunicationPreferences {
  preferredContactTimes: ('morning' | 'afternoon' | 'evening')[];
  responseFrequency: 'fast' | 'normal' | 'slow';
  communicationStyle: 'formal' | 'casual' | 'mixed';
  languageProficiency: Record<string, 'basic' | 'intermediate' | 'fluent'>;
}

// Event history analytics
export interface EventAnalytics {
  attendedCategories: Record<string, number>;
  favoriteVenues: string[];
  priceSensitivity: 'low' | 'medium' | 'high';
  bookingPatterns: {
    advanceBooking: number;
    preferredDays: string[];
    preferredTimes: string[];
  };
  cancellationRate: number;
}

// Behavioral insights
export interface BehavioralInsights {
  planningStyle: 'spontaneous' | 'organized' | 'flexible';
  socialEnergy: 'introverted' | 'balanced' | 'extroverted';
  decisionSpeed: 'quick' | 'moderate' | 'thoughtful';
  riskTolerance: 'conservative' | 'moderate' | 'adventurous';
  timeFlexibility: 'strict' | 'moderate' | 'flexible';
}

// Interests metadata
export interface InterestsMetadata {
  categoriesRanking: Record<string, number>;
  discoveryPreferences: 'conservative' | 'balanced' | 'exploratory';
  interestEvolution: Array<{
    category: string;
    timestamp: Date;
    level: number;
  }>;
  expertiseLevels: Record<string, 'beginner' | 'intermediate' | 'expert'>;
}

// Social compatibility factors
export interface CompatibilityFactors {
  ageGroupPreference?: {
    min: number;
    max: number;
  };
  groupSizePreference: 'small' | 'medium' | 'large';
  socialPace: 'relaxed' | 'moderate' | 'active';
  activityLevel: 'low' | 'moderate' | 'high';
  socialValues: string[];
}

// Combined enhanced profile type
export interface EnhancedProfileData {
  socialEngagement: SocialEngagement;
  communicationPreferences: CommunicationPreferences;
  eventAnalytics: EventAnalytics;
  behavioralInsights: BehavioralInsights;
  interestsMetadata: InterestsMetadata;
  compatibilityFactors: CompatibilityFactors;
}
```