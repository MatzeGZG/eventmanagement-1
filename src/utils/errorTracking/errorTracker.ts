import { AuditLogger } from '../security/auditLogger';
import { PerformanceMonitor } from '../performance/performanceMonitor';

interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  metadata?: Record<string, any>;
}

export class ErrorTracker {
  private static readonly ERROR_ENDPOINT = '/api/errors';

  static async captureError(error: Error, metadata?: Record<string, any>) {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      metadata
    };

    try {
      // Log to backend
      await this.logError(errorDetails);

      // Record performance impact
      PerformanceMonitor.record('error-occurred', Date.now());

      // Log to audit system
      await AuditLogger.log('error_captured', {
        error: error.message,
        metadata
      }, 'error');

    } catch (e) {
      // Fallback to console if reporting fails
      console.error('Error tracking failed:', e);
    }
  }

  private static async logError(details: ErrorDetails) {
    try {
      const response = await fetch(this.ERROR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });

      if (!response.ok) {
        throw new Error('Failed to log error');
      }
    } catch (e) {
      console.error('Error logging failed:', e);
    }
  }
}