import { PerformanceMonitor } from '../performance/performanceMonitor';

class ApiKeyManager {
  private static instance: ApiKeyManager;
  private keys: Map<string, string> = new Map();
  private keyRotationInterval: number = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {
    this.initializeKeys();
    this.setupKeyRotation();
  }

  static getInstance(): ApiKeyManager {
    if (!ApiKeyManager.instance) {
      ApiKeyManager.instance = new ApiKeyManager();
    }
    return ApiKeyManager.instance;
  }

  private initializeKeys(): void {
    // Store keys securely
    this.keys.set('mapbox', import.meta.env.VITE_MAPBOX_TOKEN);
    this.keys.set('predicthq', import.meta.env.VITE_PREDICTHQ_TOKEN);
    
    // Monitor key usage
    PerformanceMonitor.record('api-keys-initialized', Date.now());
  }

  private setupKeyRotation(): void {
    setInterval(() => {
      // Implement key rotation logic here
      this.rotateKeys();
    }, this.keyRotationInterval);
  }

  private rotateKeys(): void {
    // Implement key rotation logic
    PerformanceMonitor.record('api-keys-rotated', Date.now());
  }

  getKey(service: string): string {
    const key = this.keys.get(service);
    if (!key) {
      throw new Error(`API key not found for service: ${service}`);
    }
    return key;
  }
}

export const apiKeyManager = ApiKeyManager.getInstance();