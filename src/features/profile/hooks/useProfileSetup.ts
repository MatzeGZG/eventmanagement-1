import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';
import { EnhancedProfile } from '../types';
import { validateProfileData } from '../utils/validation';
import { createSupabaseProfile } from '../utils/supabase';

export const useProfileSetup = () => {
  const [loading, setLoading] = useState(false);
  const updateUser = useStore(state => state.updateUser);
  const { showToast } = useToast();

  const updateProfile = useCallback(async (profileData: Partial<EnhancedProfile>) => {
    setLoading(true);
    try {
      const validationErrors = validateProfileData(profileData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Save to Supabase
      await createSupabaseProfile(profileData);

      // Update local store
      updateUser(profileData);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to update profile',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }, [updateUser, showToast]);

  const completeSetup = useCallback(async () => {
    setLoading(true);
    try {
      await updateProfile({ setupComplete: true });
      showToast('Profile setup completed! Welcome to FunJetSetter', 'success');
    } catch (error) {
      showToast('Failed to complete profile setup', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [updateProfile, showToast]);

  return {
    loading,
    updateProfile,
    completeSetup
  };
};