import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';
import { AuditLogger } from '../../../utils/security/auditLogger';

export const useSecureAuth = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned');

      showToast('Login successful', 'success');
      awardPoints(50);

      await AuditLogger.log('auth_login_success', {
        userId: data.user.id
      });

    } catch (error) {
      console.error('Login error:', error);
      await AuditLogger.log('auth_login_failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'warning');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, awardPoints]);

  const register = useCallback(async (formData: { email: string; password: string; name: string }) => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registration failed');

      showToast('Registration successful! Please check your email to verify your account.', 'success');

    } catch (error) {
      console.error('Registration failed:', error);
      showToast('Registration failed. Please try again.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    login,
    register
  };
};