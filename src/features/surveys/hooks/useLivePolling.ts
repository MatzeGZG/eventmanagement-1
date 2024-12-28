import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Poll, PollVote } from '../types';
import { useToast } from '../../../hooks/useToast';

export const useLivePolling = (eventId: string) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchPoll = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('event_id', eventId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setPoll(data);

      // Subscribe to real-time vote updates
      const subscription = supabase
        .channel(`poll-${data.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'poll_votes',
          filter: `poll_id=eq.${data.id}`
        }, payload => {
          setVotes(prev => ({
            ...prev,
            [payload.new.option_index]: (prev[payload.new.option_index] || 0) + 1
          }));
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error fetching poll:', error);
      showToast('Failed to load poll', 'error');
    } finally {
      setLoading(false);
    }
  }, [eventId, showToast]);

  const submitVote = useCallback(async (optionIndex: number) => {
    if (!poll) return;

    try {
      const { error } = await supabase
        .from('poll_votes')
        .insert([{
          poll_id: poll.id,
          option_index: optionIndex
        }]);

      if (error) throw error;
      showToast('Vote submitted successfully', 'success');
    } catch (error) {
      console.error('Error submitting vote:', error);
      showToast('Failed to submit vote', 'error');
      throw error;
    }
  }, [poll, showToast]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  return {
    poll,
    votes,
    loading,
    submitVote
  };
};