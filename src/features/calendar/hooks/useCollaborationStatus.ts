```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { supabase } from '../../../lib/supabase';

interface CollaborationStatus {
  online: boolean;
  lastSynced: Date | null;
  syncInProgress: boolean;
  pendingChanges: number;
}

export const useCollaborationStatus = (calendarId: string) => {
  const [status, setStatus] = useState<CollaborationStatus>({
    online: navigator.onLine,
    lastSynced: null,
    syncInProgress: false,
    pendingChanges: 0
  });

  // Monitor online status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setStatus(prev => ({
        ...prev,
        online: navigator.onLine
      }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = supabase
      .channel(`calendar:${calendarId}`)
      .on('*', payload => {
        console.log('Calendar update:', payload);
        // Handle real-time updates
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [calendarId]);

  const sync = useCallback(async () => {
    setStatus(prev => ({ ...prev, syncInProgress: true }));
    try {
      // Implement sync logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus(prev => ({
        ...prev,
        lastSynced: new Date(),
        pendingChanges: 0
      }));
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setStatus(prev => ({ ...prev, syncInProgress: false }));
    }
  }, []);

  return {
    status,
    sync
  };
};
```