import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BasicInfoStep, InterestsStep, PrivacyStep, WelcomeStep } from './steps';
import { SignupProgress } from './SignupProgress';
import { useSignupFlow } from '../../hooks/useSignupFlow';

interface SignupStepsProps {
  onComplete?: () => void;
}

export const SignupSteps: React.FC<SignupStepsProps> = ({ onComplete }) => {
  const { 
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    handleComplete,
    progress,
    loading
  } = useSignupFlow();

  const steps = [
    { component: BasicInfoStep, title: 'Basic Info' },
    { component: InterestsStep, title: 'Your Interests' },
    { component: PrivacyStep, title: 'Privacy' },
    { component: WelcomeStep, title: 'Welcome' }
  ];

  const CurrentStep = steps[currentStep].component;

  const handleStepComplete = async () => {
    if (currentStep === steps.length - 1) {
      await handleComplete();
      onComplete?.();
    } else {
      handleNext();
    }
  };

  return (
    <div className="space-y-6">
      <SignupProgress 
        steps={steps} 
        currentStep={currentStep} 
        progress={progress} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <CurrentStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleStepComplete}
            onBack={currentStep > 0 ? handleBack : undefined}
            isLastStep={currentStep === steps.length - 1}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};