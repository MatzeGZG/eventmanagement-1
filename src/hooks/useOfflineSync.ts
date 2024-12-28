import { useCallback } from 'react';
import { useToast } from './useToast';
import { OfflineManager } from '../utils/offline/offlineManager';

export const useOfflineSync = () => {
  const { showToast } = useToast();

  const syncOfflineData = useCallback(async () => {
    try {
      await OfflineManager.syncOfflineData();
      showToast('Data synced successfully', 'success');
    } catch (error) {
      showToast('Failed to sync offline data', 'error');
    }
  }, [showToast]);

  return {
    isOnline: OfflineManager.isOnline(),
    syncOfflineData
  };
};