export class AuthRateLimiter {
  private static attempts = new Map<string, number>();
  private static lockouts = new Map<string, number>();
  private static readonly MAX_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  static checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const lockoutTime = this.lockouts.get(identifier);

    if (lockoutTime && now < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - now) / 1000 / 60);
      throw new Error('Too many attempts. Please try again in ' + remainingTime + ' minutes.');
    }

    if (lockoutTime && now >= lockoutTime) {
      this.lockouts.delete(identifier);
      this.attempts.delete(identifier);
    }

    const attempts = this.attempts.get(identifier) || 0;
    
    if (attempts >= this.MAX_ATTEMPTS) {
      this.lockouts.set(identifier, now + this.LOCKOUT_DURATION);
      throw new Error('Too many attempts. Please try again later.');
    }

    return true;
  }

  static incrementAttempts(identifier: string): void {
    const attempts = this.attempts.get(identifier) || 0;
    this.attempts.set(identifier, attempts + 1);
  }

  static resetAttempts(identifier: string): void {
    this.attempts.delete(identifier);
    this.lockouts.delete(identifier);
  }
}