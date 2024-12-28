```typescript
import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { useToast } from '../../../hooks/useToast';

interface SyncProvider {
  id: string;
  name: string;
  type: 'google' | 'apple' | 'outlook';
  connected: boolean;
}

interface SyncConfig {
  provider: SyncProvider;
  syncDirection: 'import' | 'export' | 'both';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface SyncResult {
  success: boolean;
  eventsAdded: number;
  eventsUpdated: number;
  error?: string;
}

export const useCalendarSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { showToast } = useToast();
  const addEvent = useStore(state => state.addEvent);
  const updateEvent = useStore(state => state.updateEvent);

  const syncWithProvider = useCallback(async (config: SyncConfig): Promise<SyncResult> => {
    setSyncing(true);
    try {
      // TODO: Implement actual provider-specific sync logic
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result: SyncResult = {
        success: true,
        eventsAdded: 5,
        eventsUpdated: 2
      };

      setLastSynced(new Date());
      showToast(
        `Successfully synced ${result.eventsAdded + result.eventsUpdated} events`,
        'success'
      );

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sync failed';
      showToast(message, 'error');
      return {
        success: false,
        eventsAdded: 0,
        eventsUpdated: 0,
        error: message
      };
    } finally {
      setSyncing(false);
    }
  }, [showToast, addEvent, updateEvent]);

  const handleConflicts = useCallback((
    localEvent: Event,
    remoteEvent: Event
  ): Event => {
    // Simple last-modified wins strategy
    return new Date(remoteEvent.date) > new Date(localEvent.date)
      ? remoteEvent
      : localEvent;
  }, []);

  return {
    syncing,
    lastSynced,
    syncWithProvider,
    handleConflicts
  };
};
```