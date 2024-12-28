import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStore } from '../../../store';

interface Achievements {
  connections: number;
  eventsAttended: number;
  reputation: number;
  level: number;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievements>({
    connections: 0,
    eventsAttended: 0,
    reputation: 0,
    level: 0
  });
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);

  useEffect(() => {
    const loadAchievements = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            connections,
            events_attended,
            reputation,
            level
          `)
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setAchievements({
          connections: data.connections || 0,
          eventsAttended: data.events_attended || 0,
          reputation: data.reputation || 0,
          level: data.level || 0
        });
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [user]);

  return { achievements, loading };
};