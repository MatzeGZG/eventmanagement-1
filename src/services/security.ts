import { CSPEnforcer } from '../utils/security/cspEnforcer';
import { SessionManager } from '../utils/security/sessionManager';
import { AuditLogger } from '../utils/security/auditLogger';

export const initializeSecurity = async (): Promise<void> => {
  try {
    // Initialize critical security features first
    await Promise.all([
      SessionManager.init(),
      CSPEnforcer.init()
    ]);

    // Initialize audit logging
    await AuditLogger.init();

  } catch (error) {
    console.error('Security initialization failed:', error);
    throw error;
  }
};