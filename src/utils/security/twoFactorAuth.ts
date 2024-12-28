import { supabase } from '../../lib/supabase';
import { AuditLogger } from './auditLogger';

export class TwoFactorAuth {
  private static readonly OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes
  private static otpStore = new Map<string, { code: string; expires: number }>();

  static async generateOTP(userId: string): Promise<string> {
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with expiry
    this.otpStore.set(userId, {
      code,
      expires: Date.now() + this.OTP_EXPIRY
    });

    // Log OTP generation
    await AuditLogger.log('2fa_otp_generated', { userId }, 'info');

    return code;
  }

  static async verifyOTP(userId: string, code: string): Promise<boolean> {
    const storedOTP = this.otpStore.get(userId);

    if (!storedOTP) {
      await AuditLogger.log('2fa_invalid_otp', { userId, reason: 'no_otp_found' }, 'warning');
      return false;
    }

    if (Date.now() > storedOTP.expires) {
      this.otpStore.delete(userId);
      await AuditLogger.log('2fa_expired_otp', { userId }, 'warning');
      return false;
    }

    const isValid = storedOTP.code === code;
    
    if (isValid) {
      this.otpStore.delete(userId);
      await AuditLogger.log('2fa_success', { userId }, 'info');
    } else {
      await AuditLogger.log('2fa_invalid_otp', { userId, reason: 'wrong_code' }, 'warning');
    }

    return isValid;
  }

  static async is2FAEnabled(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('two_factor_enabled')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.two_factor_enabled || false;
  }

  static cleanup(): void {
    // Clean up expired OTPs
    const now = Date.now();
    for (const [userId, otp] of this.otpStore.entries()) {
      if (now > otp.expires) {
        this.otpStore.delete(userId);
      }
    }
  }
}

// Clean up expired OTPs periodically
setInterval(() => TwoFactorAuth.cleanup(), 5 * 60 * 1000); // Every 5 minutes