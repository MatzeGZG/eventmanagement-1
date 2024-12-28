import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProfileSetupProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const ProfileSetupProgress: React.FC<ProfileSetupProgressProps> = ({
  currentStep,
  totalSteps
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="relative">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-fjs-charcoal">
        <motion.div
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Step
            key={index}
            isCompleted={index < currentStep}
            isActive={index === currentStep}
            stepNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

interface StepProps {
  isCompleted: boolean;
  isActive: boolean;
  stepNumber: number;
}

const Step: React.FC<StepProps> = ({ isCompleted, isActive, stepNumber }) => (
  <motion.div
    className={`flex items-center justify-center w-8 h-8 rounded-full ${
      isCompleted
        ? 'bg-fjs-gold'
        : isActive
        ? 'bg-fjs-charcoal border-2 border-fjs-gold'
        : 'bg-fjs-charcoal'
    }`}
    initial={{ scale: 0.8 }}
    animate={{ scale: isActive ? 1.1 : 1 }}
    transition={{ duration: 0.3 }}
  >
    {isCompleted ? (
      <Check className="w-5 h-5 text-black" />
    ) : (
      <span className={`text-sm ${isActive ? 'text-fjs-gold' : 'text-fjs-silver'}`}>
        {stepNumber}
      </span>
    )}
  </motion.div>
);