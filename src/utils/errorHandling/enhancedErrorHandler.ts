import { PerformanceMonitor } from '../performance/performanceMonitor';
import { AuditLogger } from '../security/auditLogger';
import { ErrorContext } from './types';

export class EnhancedErrorHandler {
  private static readonly ERROR_TYPES = {
    AUTH: 'AUTH_ERROR',
    API: 'API_ERROR',
    NETWORK: 'NETWORK_ERROR',
    VALIDATION: 'VALIDATION_ERROR',
    STATE: 'STATE_ERROR',
    RENDER: 'RENDER_ERROR'
  } as const;

  static async handleError(error: unknown, context: ErrorContext): Promise<void> {
    const timestamp = Date.now();
    const errorId = crypto.randomUUID();

    // Normalize error object
    const normalizedError = this.normalizeError(error);
    
    // Log detailed error information
    console.error(
      `Error [${errorId}]:`, 
      {
        ...normalizedError,
        context,
        timestamp
      }
    );

    // Record performance impact
    PerformanceMonitor.record('error-occurrence', timestamp);

    // Log to audit system
    await AuditLogger.log('error_occurred', {
      errorId,
      type: normalizedError.type,
      message: normalizedError.message,
      context,
      stack: normalizedError.stack
    }, 'error');

    // Track error frequency
    this.trackErrorFrequency(normalizedError.type);
  }

  private static normalizeError(error: unknown) {
    if (error instanceof Error) {
      return {
        type: this.determineErrorType(error),
        message: error.message,
        stack: error.stack,
        name: error.name
      };
    }
    
    return {
      type: this.ERROR_TYPES.STATE,
      message: String(error),
      stack: new Error().stack,
      name: 'UnknownError'
    };
  }

  private static determineErrorType(error: Error): string {
    if (error.name === 'AuthError') return this.ERROR_TYPES.AUTH;
    if (error.name === 'NetworkError') return this.ERROR_TYPES.NETWORK;
    if (error.message.includes('validation')) return this.ERROR_TYPES.VALIDATION;
    if (error.message.includes('render')) return this.ERROR_TYPES.RENDER;
    return this.ERROR_TYPES.STATE;
  }

  private static errorFrequency: Map<string, number> = new Map();
  private static readonly ERROR_THRESHOLD = 5;
  private static readonly ERROR_WINDOW = 60000; // 1 minute

  private static trackErrorFrequency(errorType: string) {
    const count = (this.errorFrequency.get(errorType) || 0) + 1;
    this.errorFrequency.set(errorType, count);

    if (count >= this.ERROR_THRESHOLD) {
      this.handleErrorThreshold(errorType);
      this.errorFrequency.set(errorType, 0);
    }

    setTimeout(() => {
      this.errorFrequency.set(errorType, 0);
    }, this.ERROR_WINDOW);
  }

  private static async handleErrorThreshold(errorType: string) {
    await AuditLogger.log('error_threshold_reached', {
      errorType,
      threshold: this.ERROR_THRESHOLD,
      window: this.ERROR_WINDOW
    }, 'critical');

    console.warn(`Error threshold reached for ${errorType}`);
  }
}