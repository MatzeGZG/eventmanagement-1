import { useState, useEffect } from 'react';
import { useToast } from './useToast';
import { PerformanceMonitor } from '../utils/performance/performanceMonitor';

export const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { showToast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Back online', 'success');
      PerformanceMonitor.record('online-status-change', Date.now());
    };

    const handleOffline = () => {
      setIsOffline(true);
      showToast('You are offline. Some features may be limited.', 'error');
      PerformanceMonitor.record('offline-status-change', Date.now());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  return isOffline;
};