import { apiKeyManager } from '../security/apiKeyManager';
import { RateLimiter } from '../security';
import { PerformanceMonitor } from '../performance/performanceMonitor';

interface SecureRequestConfig extends RequestInit {
  service: 'mapbox' | 'predicthq';
  rateLimit?: {
    limit: number;
    windowMs: number;
  };
}

export const secureRequest = async <T>(
  url: string,
  config: SecureRequestConfig
): Promise<T> => {
  const { service, rateLimit, ...requestConfig } = config;

  // Rate limiting
  if (rateLimit) {
    const canProceed = RateLimiter.checkLimit(
      `api-${service}`,
      rateLimit.limit,
      rateLimit.windowMs
    );
    if (!canProceed) {
      throw new Error('Rate limit exceeded');
    }
  }

  // Add security headers
  const headers = new Headers(requestConfig.headers);
  headers.set('Authorization', `Bearer ${apiKeyManager.getKey(service)}`);
  headers.set('X-Request-ID', crypto.randomUUID());

  PerformanceMonitor.start(`api-${service}`);

  try {
    const response = await fetch(url, {
      ...requestConfig,
      headers,
      credentials: 'omit' // Prevent sending cookies
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    PerformanceMonitor.end(`api-${service}`);
    return data;
  } catch (error) {
    PerformanceMonitor.record(`api-${service}-error`, Date.now());
    throw error;
  }
};