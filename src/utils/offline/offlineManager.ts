import { EventCache } from '../../features/calendar/utils/eventCache';

export class OfflineManager {
  static async init() {
    window.addEventListener('online', () => {
      this.syncOfflineData();
    });
  }

  static async syncOfflineData() {
    try {
      // Sync cached events
      const events = EventCache.get('offline-events');
      if (events) {
        // Implement sync logic here
        EventCache.clear();
        // Success notification handled by component
      }
    } catch (error) {
      console.error('Failed to sync offline data:', error);
      // Error notification handled by component
    }
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }
}