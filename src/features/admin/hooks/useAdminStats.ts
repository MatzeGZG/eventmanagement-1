import { useState, useEffect } from 'react';
import { useStore } from '../../../store';

interface AdminStats {
  totalUsers: number;
  activeEvents: number;
  mediaItems: number;
  platformGrowth: number;
  userGrowth: number;
  eventGrowth: number;
  mediaGrowth: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeEvents: 0,
    mediaItems: 0,
    platformGrowth: 0,
    userGrowth: 0,
    eventGrowth: 0,
    mediaGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    const calculateStats = () => {
      // In a real app, this would fetch from an analytics service
      const mockStats: AdminStats = {
        totalUsers: 1250,
        activeEvents: 45,
        mediaItems: 328,
        platformGrowth: 23,
        userGrowth: 15,
        eventGrowth: 28,
        mediaGrowth: 12
      };

      setStats(mockStats);
      setLoading(false);
    };

    calculateStats();
  }, []);

  return { stats, loading };
};