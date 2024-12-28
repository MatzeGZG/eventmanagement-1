import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';
import { useInterestDiscovery } from '../../../hooks/useInterestDiscovery';

export const InterestsStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { 
    interests,
    selectedInterests,
    suggestedInterests,
    toggleInterest,
    scanSocialProfiles
  } = useInterestDiscovery();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-fjs-silver">
          Select your interests to personalize your experience
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scanSocialProfiles}
          className="flex items-center px-4 py-2 bg-black/30 rounded-lg text-fjs-gold hover:bg-black/40 transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Auto-Discover
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {interests.map((category) => (
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
                    selectedInterests.includes(interest)
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

      {suggestedInterests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-fjs-gold font-medium mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Suggested Based on Your Profile
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestedInterests.map((interest) => (
              <motion.button
                key={interest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-sm bg-fjs-gold/20 text-fjs-gold hover:bg-fjs-gold/30 transition-colors`}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <StepButtons onNext={onNext} onBack={onBack} />
    </div>
  );
};