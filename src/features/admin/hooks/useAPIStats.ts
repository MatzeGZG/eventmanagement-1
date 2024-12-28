import { useState, useEffect } from 'react';
import { APIStats } from '../types/api';

export const useAPIStats = () => {
  const [stats, setStats] = useState<APIStats>({
    totalRequests: 0,
    requestsPerSecond: 0,
    successRate: 0,
    errorRate: 0,
    totalErrors: 0,
    avgResponseTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Mock data - replace with actual API call
      const mockStats: APIStats = {
        totalRequests: 1250000,
        requestsPerSecond: 42,
        successRate: 99.8,
        errorRate: 0.2,
        totalErrors: 2500,
        avgResponseTime: 135
      };

      setStats(mockStats);
      setLoading(false);
    };

    fetchStats();

    // Poll for updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
};