import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { AuthRateLimiter } from '../../../utils/security/authRateLimiter';
import { TwoFactorAuth } from '../../../utils/security/twoFactorAuth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check rate limit
      const identifier = `${email}:${window.location.hostname}`;
      AuthRateLimiter.checkRateLimit(identifier);

      // Attempt login
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!user) throw new Error('No user returned');

      // Check if 2FA is enabled
      const is2FAEnabled = await TwoFactorAuth.is2FAEnabled(user.id);
      
      if (is2FAEnabled) {
        // Generate and send OTP
        const otpCode = await TwoFactorAuth.generateOTP(user.id);
        // TODO: Send OTP via email/SMS
        
        // Return early - full login will complete after OTP verification
        return { requiresOTP: true, userId: user.id };
      }

      // Reset rate limit on successful login
      AuthRateLimiter.resetAttempts(identifier);
      showToast('Login successful', 'success');

    } catch (error) {
      // Increment failed attempts
      AuthRateLimiter.incrementAttempts(identifier);
      
      showToast(
        error instanceof Error ? error.message : 'Login failed',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const verifyOTP = useCallback(async (userId: string, code: string) => {
    setLoading(true);
    try {
      const isValid = await TwoFactorAuth.verifyOTP(userId, code);
      if (!isValid) {
        throw new Error('Invalid verification code');
      }
      showToast('Login successful', 'success');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Verification failed',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    login,
    verifyOTP
  };
};