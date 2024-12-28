```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { PerformanceMonitor } from '../../../utils/performance/performanceMonitor';

interface AnalyticsMetrics {
  revenue: number;
  revenueTrend: number;
  conversions: number;
  conversionTrend: number;
  engagement: number;
  engagementTrend: number;
  sales: number;
  salesTrend: number;
}

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    revenue: 0,
    revenueTrend: 0,
    conversions: 0,
    conversionTrend: 0,
    engagement: 0,
    engagementTrend: 0,
    sales: 0,
    salesTrend: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      PerformanceMonitor.start('fetch-analytics');
      try {
        const { data, error } = await supabase
          .from('analytics')
          .select('*')
          .single();

        if (error) throw error;

        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
        PerformanceMonitor.end('fetch-analytics');
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    loading
  };
};
```