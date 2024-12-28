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
      awardPoints(50); // Award points for first login of the day

      // Log successful login
      await AuditLogger.log('auth_login_success', {
        userId: data.user.id
      });

    } catch (error) {
      console.error('Login error:', error);
      
      // Log failed login attempt
      await AuditLogger.log('auth_login_failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'warning');

      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, awardPoints]);

  return {
    loading,
    login
  };
};