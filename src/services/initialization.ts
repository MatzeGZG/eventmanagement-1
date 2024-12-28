import { PerformanceMonitor } from '../utils/performance/performanceMonitor';
import { CSPEnforcer } from '../utils/security/cspEnforcer';
import { SessionManager } from '../utils/security/sessionManager';
import { OfflineManager } from '../utils/offline/offlineManager';
import { PersistentStorage } from '../utils/storage/persistentStorage';
import { AuditLogger } from '../utils/security/auditLogger';
import { initializeAccessibility } from '../utils/accessibility/initializeAccessibility';
import { ResourceHints } from '../utils/performance/resourceHints';
import { registerServiceWorker } from '../utils/serviceWorker/register';

export const initializeServices = async (): Promise<void> => {
  try {
    PerformanceMonitor.start('app-initialization');

    // Initialize critical services first
    await Promise.all([
      SessionManager.init(),
      CSPEnforcer.init()
    ]);

    // Initialize non-critical services in parallel
    await Promise.all([
      PersistentStorage.init(),
      OfflineManager.init(),
      AuditLogger.init(),
      registerServiceWorker(),
      ResourceHints.init()
    ]);

    // Initialize accessibility features
    initializeAccessibility();

    PerformanceMonitor.end('app-initialization');
  } catch (error) {
    // Log initialization error
    console.error('Service initialization failed:', error);
    AuditLogger.log('initialization_failed', { error }, 'critical');
    throw new Error('Failed to initialize core services');
  }
};