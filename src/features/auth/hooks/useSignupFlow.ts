import { useState, useCallback } from 'react';
import { useSecureAuth } from './useSecureAuth';
import { usePoints } from '../../../hooks/usePoints';
import { SignupFormData } from '../types/auth';

const initialFormData: SignupFormData = {
  email: '',
  password: '',
  firstName: '',
  interests: [],
  privacySettings: {
    profileVisibility: 'public',
    allowMessagesFrom: 'everyone',
    showOnlineStatus: true,
    allowTagging: true,
    showLocation: true
  }
};

export const useSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  
  const { register, loading } = useSecureAuth();
  const { awardPoints } = usePoints();

  const handleNext = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => prev - 1);
  }, []);

  const handleComplete = useCallback(async () => {
    try {
      await register(formData);
      awardPoints(50); // Award signup bonus points
    } catch (error) {
      console.error('Signup error:', error);
    }
  }, [formData, register, awardPoints]);

  const progress = ((currentStep + 1) / 4) * 100;

  return {
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    handleComplete,
    loading,
    progress
  };
};