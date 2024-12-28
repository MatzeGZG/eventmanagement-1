import { useState, useEffect } from 'react';
import { API } from '../types/api';

export const useAPIs = () => {
  const [apis, setApis] = useState<API[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPIs = async () => {
      // Mock data - replace with actual API call
      const mockAPIs: API[] = [
        {
          id: 'predicthq',
          name: 'PredictHQ API',
          description: 'Event discovery and recommendations',
          status: 'running',
          requestsPerMinute: 250,
          uptime: '99.9%',
          metrics: {
            successRate: 99.8,
            successRateTrend: 0.2,
            avgResponseTime: 145,
            responseTrend: -5,
            errorRate: 0.2,
            errorTrend: -0.1,
            availability: 99.99,
            availabilityTrend: 0.01
          }
        },
        {
          id: 'mapbox',
          name: 'Mapbox API',
          description: 'Maps and location services',
          status: 'running',
          requestsPerMinute: 180,
          uptime: '99.95%',
          metrics: {
            successRate: 99.9,
            successRateTrend: 0.1,
            avgResponseTime: 120,
            responseTrend: -3,
            errorRate: 0.1,
            errorTrend: -0.2,
            availability: 99.98,
            availabilityTrend: 0
          }
        }
      ];

      setApis(mockAPIs);
      setLoading(false);
    };

    fetchAPIs();
  }, []);

  return { apis, loading };
};