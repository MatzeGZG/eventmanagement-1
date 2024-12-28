export class AuditLogger {
  private static readonly LOG_ENDPOINT = '/api/audit-logs';

  static async init(): Promise<void> {
    // Initialize audit logging
    await this.retryFailedLogs();
  }

  static async log(
    action: string,
    details: object,
    severity: 'info' | 'warning' | 'critical' = 'info'
  ): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      severity,
      userId: localStorage.getItem('userId'),
      sessionId: sessionStorage.getItem('sessionId'),
      userAgent: navigator.userAgent
    };

    try {
      await fetch(this.LOG_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      console.error('Failed to send audit log:', error);
      this.storeFailedLog(logEntry);
    }
  }

  private static storeFailedLog(logEntry: object): void {
    const failedLogs = JSON.parse(
      localStorage.getItem('failed_audit_logs') || '[]'
    );
    failedLogs.push(logEntry);
    localStorage.setItem('failed_audit_logs', JSON.stringify(failedLogs));
  }

  private static async retryFailedLogs(): Promise<void> {
    const failedLogs = JSON.parse(
      localStorage.getItem('failed_audit_logs') || '[]'
    );
    
    if (failedLogs.length === 0) return;

    const successfulRetries = [];
    
    for (const log of failedLogs) {
      try {
        await fetch(this.LOG_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(log)
        });
        successfulRetries.push(log);
      } catch (error) {
        console.error('Failed to retry audit log:', error);
      }
    }

    // Remove successful retries from failed logs
    const remainingLogs = failedLogs.filter(
      log => !successfulRetries.includes(log)
    );
    localStorage.setItem('failed_audit_logs', JSON.stringify(remainingLogs));
  }
}