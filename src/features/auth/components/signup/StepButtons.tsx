import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface StepButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
  disabled?: boolean;
  loading?: boolean;
  nextLabel?: string;
}

export const StepButtons: React.FC<StepButtonsProps> = ({
  onNext,
  onBack,
  onComplete,
  isLastStep,
  disabled,
  loading,
  nextLabel = isLastStep ? 'Complete Setup' : 'Next'
}) => {
  return (
    <div className="flex justify-between pt-6">
      {onBack && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2 text-fjs-silver hover:text-white transition-colors disabled:opacity-50"
        >
          Back
        </motion.button>
      )}
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isLastStep ? onComplete : onNext}
        disabled={disabled || loading}
        className="px-6 py-2 bg-gradient-gold text-black rounded-lg font-medium 
                  hover:shadow-lg hover:shadow-fjs-gold/20 transition-all 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center min-w-[120px]"
      >
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          nextLabel
        )}
      </motion.button>
    </div>
  );
};