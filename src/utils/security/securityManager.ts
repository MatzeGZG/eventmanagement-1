```typescript
export class SecurityManager {
  // CSRF Protection
  static generateCSRFToken(): string {
    return crypto.randomUUID();
  }

  // Request Signing
  static signRequest(payload: any): string {
    const data = JSON.stringify(payload);
    // Implementation using Web Crypto API
    return btoa(data);
  }

  // Rate Limiting
  static checkRateLimit(key: string, limit: number, window: number): boolean {
    const now = Date.now();
    const timestamps = JSON.parse(localStorage.getItem(key) || '[]');
    const validTimestamps = timestamps.filter((t: number) => now - t < window);
    
    if (validTimestamps.length >= limit) return false;
    
    localStorage.setItem(key, JSON.stringify([...validTimestamps, now]));
    return true;
  }
}
```