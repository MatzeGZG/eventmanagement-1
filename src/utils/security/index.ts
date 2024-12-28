// API key handling
export const secureApiKeys = {
  getKey: (key: string): string => {
    // Only return keys to trusted internal services
    if (!isSecureContext) {
      console.error('Insecure context - API keys not available');
      return '';
    }
    return import.meta.env[key] || '';
  }
};

// Input sanitization
export const sanitizer = {
  cleanInput: (input: string): string => {
    return input.replace(/[<>]/g, '').trim();
  },
  
  validateFileName: (filename: string): boolean => {
    return /^[a-zA-Z0-9-_\.]+$/.test(filename);
  },

  escapeHtml: (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};

// Rate limiting
export class RateLimiter {
  private static requests = new Map<string, number[]>();
  
  static checkLimit(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get existing requests
    const requests = this.requests.get(key) || [];
    
    // Filter out old requests
    const validRequests = requests.filter(time => time > windowStart);
    
    // Check if under limit
    if (validRequests.length < limit) {
      validRequests.push(now);
      this.requests.set(key, validRequests);
      return true;
    }
    
    return false;
  }
}

// CSRF Protection
export const csrfProtection = {
  generateToken: async (): Promise<string> => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  validateToken: (token: string, storedToken: string): boolean => {
    return token === storedToken;
  }
};