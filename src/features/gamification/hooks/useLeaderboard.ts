import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  const loadLeaderboard = useCallback(async () => {
    try {
      // Get top 10 users by points
      const { data: topUsers, error } = await supabase
        .from('profiles')
        .select('id, name, level, points')
        .order('points', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Get user's rank
      if (user) {
        const { count: userRankCount, error: rankError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact' })
          .gt('points', user.points);

        if (rankError) throw rankError;
        setUserRank(userRankCount + 1);
      }

      setLeaderboard(topUsers);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      showToast('Failed to load leaderboard', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    loadLeaderboard();
    // Update leaderboard every 5 minutes
    const interval = setInterval(loadLeaderboard, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadLeaderboard]);

  return {
    leaderboard,
    userRank,
    loading,
    refresh: loadLeaderboard
  };
};