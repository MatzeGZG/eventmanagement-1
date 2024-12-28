import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileSetup } from '../../hooks/useProfileSetup';
import { ProfileSetupProgress } from './ProfileSetupProgress';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { SocialLinksStep } from './steps/SocialLinksStep';
import { InterestsStep } from './steps/InterestsStep';
import { PrivacyStep } from './steps/PrivacyStep';
import { TravelPreferencesStep } from './steps/TravelPreferencesStep';
import { GamificationIntroStep } from './steps/GamificationIntroStep';

export const ProfileSetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeSetup, loading } = useProfileSetup();

  const steps = [
    { component: BasicInfoStep, title: 'Basic Information' },
    { component: SocialLinksStep, title: 'Social Media' },
    { component: InterestsStep, title: 'Your Interests' },
    { component: TravelPreferencesStep, title: 'Travel Preferences' },
    { component: PrivacyStep, title: 'Privacy Settings' },
    { component: GamificationIntroStep, title: 'Unlock Achievements' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    await completeSetup();
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ProfileSetupProgress 
          currentStep={currentStep} 
          totalSteps={steps.length} 
        />

        <div className="mt-8 bg-fjs-charcoal rounded-xl shadow-xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-fjs-gold mb-6">
                {steps[currentStep].title}
              </h2>

              <CurrentStepComponent 
                onNext={handleNext}
                onBack={handleBack}
                onComplete={handleComplete}
                isLastStep={currentStep === steps.length - 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};