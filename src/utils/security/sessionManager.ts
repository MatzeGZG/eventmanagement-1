export class SessionManager {
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static lastActivity: number = Date.now();
  private static timeoutId: NodeJS.Timeout | null = null;

  static init(): void {
    this.resetTimer();
    this.setupActivityListeners();
  }

  private static setupActivityListeners(): void {
    ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
      document.addEventListener(event, () => this.resetTimer());
    });
  }

  private static resetTimer(): void {
    this.lastActivity = Date.now();
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.SESSION_TIMEOUT);
  }

  private static async handleSessionTimeout(): Promise<void> {
    try {
      // Clear session data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      // Redirect to login
      window.location.href = '/login?reason=session_timeout';
    } catch (error) {
      console.error('Session timeout error:', error);
    }
  }

  static isSessionValid(): boolean {
    return Date.now() - this.lastActivity < this.SESSION_TIMEOUT;
  }
}