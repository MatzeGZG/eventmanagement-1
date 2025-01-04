import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('xp, level, connections, badges')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Calculate achievements based on profile data
        const calculatedAchievements: Achievement[] = [
          {
            id: 'first-steps',
            title: 'First Steps',
            description: 'Complete your profile setup',
            icon: '🎯',
            unlocked: true,
            progress: 100,
            maxProgress: 100
          },
          {
            id: 'xp-warrior',
            title: 'XP Warrior',
            description: 'Earn your first 1000 XP',
            icon: '⚔️',
            unlocked: (profile.xp || 0) >= 1000,
            progress: Math.min(profile.xp || 0, 1000),
            maxProgress: 1000
          },
          {
            id: 'social-butterfly',
            title: 'Social Butterfly',
            description: 'Connect with 10 other users',
            icon: '🦋',
            unlocked: (profile.connections?.length || 0) >= 10,
            progress: profile.connections?.length || 0,
            maxProgress: 10
          },
          {
            id: 'badge-collector',
            title: 'Badge Collector',
            description: 'Earn 5 different badges',
            icon: '🏅',
            unlocked: (profile.badges?.length || 0) >= 5,
            progress: profile.badges?.length || 0,
            maxProgress: 5
          }
        ];

        setAchievements(calculatedAchievements);
      } catch (error) {
        console.error('Error loading achievements:', error);
        showToast('Failed to load achievements', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [showToast]);

  return {
    achievements,
    loading
  };
};