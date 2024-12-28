import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useProfileCompletion = () => {
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const calculateProgress = useCallback(async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (!profile) return 0;

    let completed = 0;
    const totalSteps = 7;

    // Check each profile section
    if (profile.avatar) completed++;
    if (profile.bio) completed++;
    if (profile.interests?.length > 0) completed++;
    if (profile.social_links?.length > 0) completed++;
    if (profile.privacy_settings) completed++;
    if (profile.travel_preferences) completed++;
    if (profile.location) completed++;

    const percentage = Math.round((completed / totalSteps) * 100);
    setProgress(percentage);

    // Award points for profile completion milestones
    if (percentage === 100) {
      awardPoints(50); // Full profile completion bonus
    } else if (percentage >= 50 && progress < 50) {
      awardPoints(25); // Half completion bonus
    }

    return percentage;
  }, [progress, awardPoints]);

  return {
    progress,
    calculateProgress
  };
};