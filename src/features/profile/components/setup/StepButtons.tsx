import React from 'react';
import { motion } from 'framer-motion';

interface StepButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
  nextLabel?: string;
}

export const StepButtons: React.FC<StepButtonsProps> = ({
  onNext,
  onBack,
  onComplete,
  isLastStep,
  nextLabel = isLastStep ? 'Complete Setup' : 'Next'
}) => {
  return (
    <div className="flex justify-between pt-6">
      {onBack && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-2 text-fjs-silver hover:text-white transition-colors"
        >
          Back
        </motion.button>
      )}
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isLastStep ? onComplete : onNext}
        className="px-6 py-2 bg-gradient-gold text-black rounded-lg font-medium 
                 hover:shadow-lg hover:shadow-fjs-gold/20 transition-all"
      >
        {nextLabel}
      </motion.button>
    </div>
  );
};