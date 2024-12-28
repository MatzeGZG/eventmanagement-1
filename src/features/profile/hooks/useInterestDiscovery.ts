import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';

interface InterestCategory {
  name: string;
  interests: string[];
}

export const useInterestDiscovery = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [suggestedInterests, setSuggestedInterests] = useState<string[]>([]);
  const { showToast } = useToast();

  const interests: InterestCategory[] = [
    {
      name: 'Travel & Adventure',
      interests: ['Backpacking', 'Luxury Travel', 'Road Trips', 'Adventure Sports', 'Cultural Tours']
    },
    {
      name: 'Events & Entertainment',
      interests: ['Live Music', 'Food Festivals', 'Art Exhibitions', 'Theater', 'Nightlife']
    },
    {
      name: 'Lifestyle',
      interests: ['Fine Dining', 'Wellness', 'Fashion', 'Photography', 'Local Experiences']
    },
    {
      name: 'Professional',
      interests: ['Networking', 'Tech Events', 'Business', 'Workshops', 'Conferences']
    }
  ];

  const toggleInterest = useCallback((interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  }, []);

  const scanSocialProfiles = useCallback(async () => {
    try {
      // In production, this would call an AI service to analyze social profiles
      const mockSuggestions = [
        'Photography',
        'Food Tourism',
        'Cultural Events',
        'Eco Travel'
      ];
      
      setSuggestedInterests(mockSuggestions);
      showToast('Interests discovered from your profiles!', 'success');
    } catch (error) {
      showToast('Failed to scan social profiles', 'error');
    }
  }, [showToast]);

  return {
    interests,
    selectedInterests,
    suggestedInterests,
    toggleInterest,
    scanSocialProfiles
  };
};