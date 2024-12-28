import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { StepButtons } from '../StepButtons';
import { StepProps } from '../types';
import { useInterestDiscovery } from '../../../../profile/hooks/useInterestDiscovery';

export const InterestsStep: React.FC<StepProps> = ({ formData, setFormData, onNext, onBack }) => {
  const { interests, selectedInterests, suggestedInterests, toggleInterest, scanSocialProfiles } = useInterestDiscovery();

  const handleNext = () => {
    setFormData({ ...formData, interests: selectedInterests });
    onNext();
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

      <StepButtons 
        onNext={handleNext} 
        onBack={onBack}
        disabled={selectedInterests.length === 0}
      />
    </div>
  );
};