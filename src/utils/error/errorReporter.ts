```typescript
import { AppError } from './errorTypes';
import { AuditLogger } from '../security/auditLogger';

export class ErrorReporter {
  private static readonly ERROR_ENDPOINT = '/api/errors';

  static async captureError(error: Error, metadata?: Record<string, any>) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      type: error instanceof AppError ? error.code : 'UNKNOWN',
      metadata,
      timestamp: new Date().toISOString()
    };

    try {
      // Log to backend
      await fetch(this.ERROR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorDetails)
      });

      // Log to audit system
      await AuditLogger.log('error_captured', {
        error: error.message,
        metadata
      }, 'error');

    } catch (e) {
      // Fallback to console if reporting fails
      console.error('Error reporting failed:', e);
    }
  }

  static async captureException(error: unknown, context?: string) {
    if (error instanceof Error) {
      await this.captureError(error, { context });
    } else {
      await this.captureError(new Error(String(error)), { context });
    }
  }
}
```