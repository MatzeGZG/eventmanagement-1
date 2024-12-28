import { useState, useCallback } from 'react';
import { EventSyncService } from '../services/eventSyncService';
import { useToast } from '../../../hooks/useToast';
import { useLocation } from '../../../hooks/useLocation';

export const useEventSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { showToast } = useToast();
  const { coordinates } = useLocation();

  const syncService = new EventSyncService();

  const syncEvents = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);

    try {
      // Get events for the next 30 days
      const dateRange = {
        start: new Date(),
        end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      };

      // Use user's location if available
      const location = coordinates ? {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        radius: 50 // 50km radius
      } : undefined;

      const result = await syncService.syncEvents({
        dateRange,
        location,
        batchSize: 100
      });

      showToast(
        `Synced ${result.added + result.updated} events successfully`,
        'success'
      );

      if (result.failed > 0) {
        console.warn('Some events failed to sync:', result.errors);
        showToast(`${result.failed} events failed to sync`, 'error');
      }

      setLastSynced(new Date());
    } catch (error) {
      console.error('Event sync failed:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to sync events',
        'error'
      );
    } finally {
      setSyncing(false);
    }
  }, [syncing, coordinates, showToast]);

  return {
    syncing,
    lastSynced,
    syncEvents
  };
};