import { useState, useCallback } from 'react';
import { useAuthValidation } from './useAuthValidation';
import { useSecureAuth } from './useSecureAuth';
import { useToast } from '../../../hooks/useToast';

export const useAuthForm = (mode: 'login' | 'signup') => {
  const [loading, setLoading] = useState(false);
  const { validateForm } = useAuthValidation();
  const { login, register } = useSecureAuth();
  const { showToast } = useToast();

  const handleSubmit = useCallback(async (data: any) => {
    if (!validateForm(data)) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(data.email, data.password);
      } else {
        await register(data);
      }
      showToast(`Successfully ${mode === 'login' ? 'signed in' : 'registered'}!`, 'success');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Authentication failed',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [mode, validateForm, login, register, showToast]);

  return {
    loading,
    handleSubmit
  };
};