import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Survey, SurveyResponse } from '../types';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useSurvey = (eventId: string) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const fetchSurvey = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select(`
          *,
          questions:survey_questions(*)
        `)
        .eq('event_id', eventId)
        .single();

      if (error) throw error;
      setSurvey(data);
    } catch (error) {
      console.error('Error fetching survey:', error);
      showToast('Failed to load survey', 'error');
    } finally {
      setLoading(false);
    }
  }, [eventId, showToast]);

  const submitResponse = useCallback(async (response: Omit<SurveyResponse, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert([response]);

      if (error) throw error;

      showToast('Response submitted successfully', 'success');
      awardPoints(25); // Award points for participation
    } catch (error) {
      console.error('Error submitting response:', error);
      showToast('Failed to submit response', 'error');
      throw error;
    }
  }, [showToast, awardPoints]);

  return {
    survey,
    loading,
    fetchSurvey,
    submitResponse
  };
};