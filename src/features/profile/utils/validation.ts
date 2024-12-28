import { EnhancedProfile } from '../types';

export const validateProfileData = (profile: Partial<EnhancedProfile>): string[] => {
  const errors: string[] = [];

  if (profile.name && profile.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (profile.bio && profile.bio.length > 500) {
    errors.push('Bio must be less than 500 characters');
  }

  if (profile.socialLinks) {
    for (const link of profile.socialLinks) {
      if (!isValidUrl(link.url)) {
        errors.push(`Invalid ${link.platform} URL`);
      }
    }
  }

  if (profile.travelPreferences) {
    if (profile.travelPreferences.preferredDestinations.length === 0) {
      errors.push('Please select at least one preferred destination');
    }
    if (profile.travelPreferences.interests.length === 0) {
      errors.push('Please select at least one travel interest');
    }
  }

  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};