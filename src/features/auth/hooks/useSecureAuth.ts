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

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      showToast('Signed out successfully', 'success');
      await AuditLogger.log('auth_logout_success', {});

    } catch (error) {
      console.error('Sign out error:', error);
      showToast('Failed to sign out. Please try again.', 'error');
      await AuditLogger.log('auth_logout_failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'warning');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      showToast('Password reset instructions sent to your email', 'success');
      await AuditLogger.log('auth_password_reset_requested', { email });

    } catch (error) {
      console.error('Password reset error:', error);
      showToast('Failed to send reset instructions. Please try again.', 'error');
      await AuditLogger.log('auth_password_reset_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        email
      }, 'warning');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updatePassword = useCallback(async (newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      showToast('Password updated successfully', 'success');
      await AuditLogger.log('auth_password_updated', {});

    } catch (error) {
      console.error('Password update error:', error);
      showToast('Failed to update password. Please try again.', 'error');
      await AuditLogger.log('auth_password_update_failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'warning');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    login,
    register,
    signOut,
    resetPassword,
    updatePassword
  };
};