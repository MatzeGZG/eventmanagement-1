import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useSocialConnections = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const sendConnectionRequest = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert([{ recipient_id: userId }]);

      if (error) throw error;
      
      showToast('Connection request sent!', 'success');
      awardPoints(10); // Award points for social engagement
    } catch (error) {
      showToast('Failed to send connection request', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast, awardPoints]);

  const acceptConnectionRequest = useCallback(async (requestId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
      
      showToast('Connection accepted!', 'success');
      awardPoints(15); // Award points for growing network
    } catch (error) {
      showToast('Failed to accept connection', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast, awardPoints]);

  return {
    loading,
    sendConnectionRequest,
    acceptConnectionRequest
  };
};