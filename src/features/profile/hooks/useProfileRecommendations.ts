import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Event } from '../../../types/event';
import { User } from '../../../types/user';

interface Recommendations {
  events: Event[];
  connections: User[];
  score: number;
}

export const useProfileRecommendations = () => {
  const [loading, setLoading] = useState(false);

  const getRecommendations = useCallback(async (): Promise<Recommendations> => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Get user's profile with all preferences
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Get recommended events based on preferences
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .contains('tags', profile.cultural_interests)
        .gte('date', new Date().toISOString())
        .limit(10);

      // Get recommended connections based on shared interests
      const { data: connections } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .contains('interests', profile.interests)
        .limit(10);

      return {
        events: events || [],
        connections: connections || [],
        score: calculateMatchScore(profile, events, connections)
      };
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return { events: [], connections: [], score: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    getRecommendations
  };
};

// Helper function to calculate match score
const calculateMatchScore = (profile: any, events: any[], connections: any[]): number => {
  let score = 0;

  // Score based on event matches
  events.forEach(event => {
    const interestMatch = event.tags.filter((tag: string) => 
      profile.cultural_interests.includes(tag)
    ).length;
    score += interestMatch * 10;
  });

  // Score based on connection matches
  connections.forEach(connection => {
    const sharedInterests = connection.interests.filter((interest: string) =>
      profile.interests.includes(interest)
    ).length;
    score += sharedInterests * 5;
  });

  return Math.min(100, score);
};