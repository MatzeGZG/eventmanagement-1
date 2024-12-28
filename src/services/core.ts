import { PerformanceMonitor } from '../utils/performance/performanceMonitor';
import { OfflineManager } from '../utils/offline/offlineManager';
import { PersistentStorage } from '../utils/storage/persistentStorage';

export const initializeCore = async (): Promise<void> => {
  PerformanceMonitor.start('core-initialization');

  try {
    await Promise.all([
      PersistentStorage.init(),
      OfflineManager.init()
    ]);

    PerformanceMonitor.end('core-initialization');
  } catch (error) {
    PerformanceMonitor.record('core-initialization-error', Date.now());
    throw error;
  }
};