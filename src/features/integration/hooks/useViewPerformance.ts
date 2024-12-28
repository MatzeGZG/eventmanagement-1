import { useEffect } from 'react';
import { ViewMode } from '../types';
import { PerformanceMonitor } from '../../../utils/performance/performanceMonitor';

export const useViewPerformance = (view: ViewMode) => {
  useEffect(() => {
    const markName = `view-${view}-render`;
    PerformanceMonitor.start(markName);

    return () => {
      PerformanceMonitor.end(markName);
    };
  }, [view]);

  useEffect(() => {
    // Monitor view transitions
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        PerformanceMonitor.record(`view-transition-${view}`, entry.duration);
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, [view]);
};