```typescript
import { useState, useCallback, useEffect } from 'react';
import { Event } from '../../../types/event';

interface OfflineChange {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: Event;
  timestamp: number;
}

export const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState<OfflineChange[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queueChange = useCallback((change: OfflineChange) => {
    setPendingChanges(prev => [...prev, change]);
    
    // Store in IndexedDB
    const request = indexedDB.open('calendar', 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('pendingChanges', 'readwrite');
      tx.objectStore('pendingChanges').add(change);
    };
  }, []);

  const syncPendingChanges = useCallback(async () => {
    if (!isOnline || pendingChanges.length === 0) return;

    for (const change of pendingChanges) {
      try {
        // Implement actual API sync
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    syncPendingChanges
  };
};
```