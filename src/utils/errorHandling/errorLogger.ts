import { PerformanceMonitor } from '../performance/performanceMonitor';
import { ERROR_CONFIG, ERROR_MESSAGES } from './constants';
import { ErrorLogEntry } from './types';

export class ErrorLogger {
  private static errorLog: ErrorLogEntry[] = [];

  static log(
    type: string,
    message: string,
    context?: Record<string, any>
  ): string {
    const entry: ErrorLogEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type,
      message,
      stack: new Error().stack,
      context
    };

    // Add to log with size limit
    this.errorLog.unshift(entry);
    if (this.errorLog.length > ERROR_CONFIG.MAX_LOG_SIZE) {
      this.errorLog.pop();
    }

    // Track performance impact
    PerformanceMonitor.record(`error_${type}`, entry.timestamp);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(
        `Error [${type}]: ${message}`,
        context,
        entry.stack
      );
    }

    return entry.id;
  }

  static getRecentErrors(limit = 10): ErrorLogEntry[] {
    return this.errorLog.slice(0, limit);
  }

  static getErrorById(id: string): ErrorLogEntry | undefined {
    return this.errorLog.find(entry => entry.id === id);
  }

  static getErrorsByType(type: string): ErrorLogEntry[] {
    return this.errorLog.filter(entry => entry.type === type);
  }

  static clear(): void {
    this.errorLog = [];
  }

  static getErrorMessage(type: keyof typeof ERROR_MESSAGES): string {
    return ERROR_MESSAGES[type] || ERROR_MESSAGES.UNKNOWN;
  }
}