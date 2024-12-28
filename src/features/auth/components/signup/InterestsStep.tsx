import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { StepProps } from './types';
import { StepButtons } from '../StepButtons';

const INTEREST_CATEGORIES = [
  {
    name: 'Events & Entertainment',
    interests: ['Live Music', 'Theater', 'Comedy Shows', 'Film Festivals', 'Art Exhibitions']
  },
  {
    name: 'Food & Drink',
    interests: ['Fine Dining', 'Wine Tasting', 'Food Festivals', 'Cooking Classes', 'Craft Beer']
  },
  {
    name: 'Professional',
    interests: ['Networking', 'Tech Conferences', 'Workshops', 'Business Meetups', 'Startup Events']
  },
  {
    name: 'Lifestyle',
    interests: ['Fashion Shows', 'Wellness Events', 'Charity Galas', 'Cultural Festivals', 'Sports']
  }
];

export const InterestsStep: React.FC<StepProps> = ({ formData, setFormData, onNext, onBack }) => {
  const toggleInterest = (interest: string) => {
    const interests = formData.interests || [];
    setFormData({
      ...formData,
      interests: interests.includes(interest)
        ? interests.filter(i => i !== interest)
        : [...interests, interest]
    });
  };

  const handleAutoDiscover = () => {
    // Mock auto-discovery - in production this would analyze social profiles
    const suggestedInterests = [
      'Live Music',
      'Food Festivals',
      'Tech Conferences',
      'Fashion Shows'
    ];
    setFormData({
      ...formData,
      interests: [...new Set([...(formData.interests || []), ...suggestedInterests])]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-fjs-silver">
          Select your interests to personalize your experience
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAutoDiscover}
          className="flex items-center px-4 py-2 bg-black/30 rounded-lg text-fjs-gold hover:bg-black/40 transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Auto-Discover
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {INTEREST_CATEGORIES.map((category) => (
          <div key={category.name} className="space-y-3">
            <h3 className="font-medium text-white flex items-center">
              <Tag className="w-4 h-4 text-fjs-gold mr-2" />
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.interests.map((interest) => (
                <motion.button
                  key={interest}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    formData.interests?.includes(interest)
                      ? 'bg-fjs-gold text-black'
                      : 'bg-black/30 text-fjs-silver hover:bg-black/40'
                  }`}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <StepButtons 
        onNext={onNext} 
        onBack={onBack}
        disabled={!formData.interests?.length}
      />
    </div>
  );
};