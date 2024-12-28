import { useState, useCallback } from 'react';
import { AuthRateLimiter } from '../../../utils/security/authRateLimiter';

export const useAuthValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((field: string, value: string): boolean => {
    const error = validateFieldValue(field, value);
    setErrors(prev => ({...prev, [field]: error}));
    return !error;
  }, []);

  const validateFieldValue = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 12) return 'Password must be at least 12 characters';
        if (!/[A-Z]/.test(value)) return 'Password must include uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must include number';
        if (!/[^A-Za-z0-9]/.test(value)) return 'Password must include special character';
        return '';

      default:
        return '';
    }
  };

  const validateForm = useCallback((data: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(data).forEach(([field, value]) => {
      const error = validateFieldValue(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors: () => setErrors({})
  };
};