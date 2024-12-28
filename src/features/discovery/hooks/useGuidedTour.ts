import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';

export const useGuidedTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { awardPoints } = usePoints();

  const nextStep = useCallback(() => {
    if (currentStep === 3) {
      setIsComplete(true);
      awardPoints(25); // Award points for completing the tour
      localStorage.setItem('guided_tour_complete', 'true');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, awardPoints]);

  const skipTour = useCallback(() => {
    setIsComplete(true);
    localStorage.setItem('guided_tour_complete', 'true');
  }, []);

  return {
    currentStep,
    nextStep,
    skipTour,
    isComplete
  };
};