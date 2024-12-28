```typescript
export class RateLimiter {
  private static limits = new Map<string, number[]>();

  static checkLimit(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.limits.get(key) || [];
    
    // Remove expired timestamps
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.limits.set(key, validRequests);
    return true;
  }

  static clearExpired() {
    const now = Date.now();
    this.limits.forEach((requests, key) => {
      const validRequests = requests.filter(time => now - time < 60000);
      if (validRequests.length === 0) {
        this.limits.delete(key);
      } else {
        this.limits.set(key, validRequests);
      }
    });
  }
}

// Clear expired entries periodically
setInterval(() => RateLimiter.clearExpired(), 60000);
```