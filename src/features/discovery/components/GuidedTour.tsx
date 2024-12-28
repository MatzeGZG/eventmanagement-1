import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Calendar, Users, Star } from 'lucide-react';
import { useGuidedTour } from '../hooks/useGuidedTour';

export const GuidedTour: React.FC = () => {
  const { currentStep, nextStep, skipTour, isComplete } = useGuidedTour();

  if (isComplete) return null;

  const steps = [
    {
      icon: Map,
      title: 'Explore Events',
      description: 'Discover amazing events happening around you'
    },
    {
      icon: Calendar,
      title: 'Plan Your Schedule',
      description: 'Keep track of your events and get reminders'
    },
    {
      icon: Users,
      title: 'Connect with Others',
      description: 'Meet people who share your interests'
    },
    {
      icon: Star,
      title: 'Earn Rewards',
      description: 'Get points and unlock exclusive benefits'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 bg-black/90 rounded-lg shadow-lg p-4 max-w-sm z-50"
      >
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-fjs-gold rounded-lg">
            {steps[currentStep].icon && <steps[currentStep].icon className="w-6 h-6 text-black" />}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-fjs-gold">
              {steps[currentStep].title}
            </h3>
            <p className="text-sm text-fjs-silver mt-1">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={skipTour}
            className="text-sm text-fjs-silver hover:text-white"
          >
            Skip tour
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};