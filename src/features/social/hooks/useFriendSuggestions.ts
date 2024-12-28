```typescript
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';

export const useFriendSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  const loadSuggestions = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          avatar,
          interests,
          connections
        `)
        .neq('id', user.id)
        .limit(10);

      if (error) throw error;

      // Calculate mutual connections and sort by relevance
      const suggestionsWithMutual = data.map(profile => ({
        ...profile,
        mutualConnections: profile.connections.filter(id => 
          user.connections.includes(id)
        ).length,
        interestOverlap: profile.interests.filter(interest =>
          user.interests.includes(interest)
        ).length
      }))
      .sort((a, b) => 
        (b.mutualConnections * 2 + b.interestOverlap) - 
        (a.mutualConnections * 2 + a.interestOverlap)
      );

      setSuggestions(suggestionsWithMutual);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      showToast('Failed to load suggestions', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  const sendFriendRequest = useCallback(async (recipientId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .insert([{ recipient_id: recipientId }]);

      if (error) throw error;
      showToast('Friend request sent!', 'success');
    } catch (error) {
      showToast('Failed to send friend request', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  return {
    suggestions,
    loading,
    sendFriendRequest,
    refresh: loadSuggestions
  };
};
```