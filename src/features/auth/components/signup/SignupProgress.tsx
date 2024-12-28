import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SignupProgressProps {
  steps: Array<{ title: string }>;
  currentStep: number;
  progress: number;
}

export const SignupProgress: React.FC<SignupProgressProps> = ({
  steps,
  currentStep,
  progress
}) => {
  return (
    <div>
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
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-fjs-gold text-black'
                    : 'bg-fjs-charcoal text-fjs-silver'
                }`}
                animate={{
                  scale: index === currentStep ? 1.1 : 1,
                  backgroundColor: index <= currentStep ? '#D4AF37' : '#2C2C2C'
                }}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span className="block mt-2 text-xs text-fjs-silver">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};