```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useWaitlist = (eventId: string) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const addToWaitlist = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('event_waitlist')
        .insert([{ event_id: eventId, user_id: userId }]);

      if (error) throw error;

      showToast('Added to waitlist successfully', 'success');
      awardPoints(5); // Award points for joining waitlist
    } catch (error) {
      showToast('Failed to join waitlist', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [eventId, showToast, awardPoints]);

  const processWaitlist = useCallback(async () => {
    setLoading(true);
    try {
      const { data: waitlistEntries, error } = await supabase
        .from('event_waitlist')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at');

      if (error) throw error;

      // Process waitlist entries
      for (const entry of waitlistEntries) {
        // Add user to event attendees
        const { error: updateError } = await supabase
          .from('events')
          .update({
            attendees: supabase.sql`array_append(attendees, ${entry.user_id})`
          })
          .eq('id', eventId);

        if (updateError) continue;

        // Remove from waitlist
        await supabase
          .from('event_waitlist')
          .delete()
          .eq('id', entry.id);
      }

      showToast('Waitlist processed successfully', 'success');
    } catch (error) {
      showToast('Failed to process waitlist', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [eventId, showToast]);

  return {
    loading,
    addToWaitlist,
    processWaitlist
  };
};
```