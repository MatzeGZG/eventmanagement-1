```typescript
import { useState, useCallback } from 'react';
import { Event } from '../../../types/event';

interface PendingChange {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: Event;
  timestamp: number;
}

export const useOfflineSync = () => {
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queueChange = useCallback((change: PendingChange) => {
    setPendingChanges(prev => [...prev, change]);
    
    // Store in IndexedDB for persistence
    const request = indexedDB.open('calendar', 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('pendingChanges', 'readwrite');
      tx.objectStore('pendingChanges').add(change);
    };
  }, []);

  const processPendingChanges = useCallback(async () => {
    if (!isOnline || pendingChanges.length === 0) return;

    // Process changes in order
    for (const change of pendingChanges) {
      try {
        // TODO: Implement actual API calls
        await syncChange(change);
        setPendingChanges(prev => 
          prev.filter(c => c.id !== change.id)
        );
      } catch (error) {
        console.error('Failed to sync change:', error);
      }
    }
  }, [isOnline, pendingChanges]);

  return {
    isOnline,
    pendingChanges,
    queueChange,
    processPendingChanges
  };
};

const syncChange = async (change: PendingChange): Promise<void> => {
  // Implement actual API sync logic
  await new Promise(resolve => setTimeout(resolve, 1000));
};
```