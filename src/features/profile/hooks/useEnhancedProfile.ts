import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { EnhancedProfile } from '../types/profile';

export const useEnhancedProfile = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const updateProfile = useCallback(async (updates: Partial<EnhancedProfile>) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          profession: updates.professional?.profession,
          industry: updates.professional?.industry,
          skills: updates.professional?.skills,
          preferred_event_types: updates.eventPreferences?.preferredEventTypes,
          preferred_times: updates.eventPreferences?.preferredTimes,
          price_range: updates.eventPreferences?.priceRange,
          languages: updates.socialPreferences?.languages,
          networking_goals: updates.socialPreferences?.networkingGoals,
          preferred_group_size: updates.socialPreferences?.preferredGroupSize,
          home_location: updates.travelPreferences?.homeLocation,
          travel_radius: updates.travelPreferences?.travelRadius,
          travel_preferences: updates.travelPreferences?.preferences,
          dietary_restrictions: updates.personalPreferences?.dietaryRestrictions,
          accessibility_needs: updates.personalPreferences?.accessibilityNeeds,
          cultural_interests: updates.personalPreferences?.culturalInterests,
          personality_traits: updates.personalityProfile?.personalityTraits,
          interaction_style: updates.personalityProfile?.interactionStyle,
          preferred_age_range: updates.personalityProfile?.preferredAgeRange
        })
        .eq('id', user.id);

      if (error) throw error;
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    updateProfile
  };
};