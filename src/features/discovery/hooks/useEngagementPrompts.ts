import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';

interface EngagementPrompt {
  id: string;
  type: 'event' | 'social' | 'rewards';
  title: string;
  description: string;
  actionText: string;
  points?: number;
}

export const useEngagementPrompts = () => {
  const [prompts, setPrompts] = useState<EngagementPrompt[]>([
    {
      id: 'first-event',
      type: 'event',
      title: 'Find Your First Event',
      description: 'RSVP to an event that matches your interests',
      actionText: 'Browse Events',
      points: 10
    },
    {
      id: 'connect-users',
      type: 'social',
      title: 'Grow Your Network',
      description: 'Connect with other members who share your interests',
      actionText: 'Find Connections',
      points: 15
    },
    {
      id: 'complete-profile',
      type: 'rewards',
      title: 'Complete Your Profile',
      description: 'Add more details to earn points and unlock features',
      actionText: 'Update Profile',
      points: 20
    }
  ]);

  const { awardPoints } = usePoints();

  const dismissPrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleAction = useCallback((prompt: EngagementPrompt) => {
    if (prompt.points) {
      awardPoints(prompt.points);
    }
    dismissPrompt(prompt.id);
  }, [awardPoints, dismissPrompt]);

  return {
    prompts,
    dismissPrompt,
    handleAction
  };
};