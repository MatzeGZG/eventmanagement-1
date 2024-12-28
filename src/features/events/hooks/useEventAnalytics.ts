```typescript
import { useCallback, useState } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';

interface EventAnalytics {
  attendanceRate: number;
  popularCategories: Record<string, number>;
  peakTimes: Record<string, number>;
  trendingScore: number;
}

export const useEventAnalytics = (eventId: string) => {
  const [analytics, setAnalytics] = useState<EventAnalytics>();
  const [loading, setLoading] = useState(false);
  const events = useStore(state => state.events);

  const calculateAnalytics = useCallback(() => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    setLoading(true);
    try {
      // Calculate attendance rate
      const attendanceRate = event.attendees.length / event.capacity;

      // Calculate trending score based on multiple factors
      const daysUntilEvent = Math.max(0, (event.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      const trendingScore = calculateTrendingScore(event, daysUntilEvent);

      // Analyze peak times
      const peakTimes = analyzePeakTimes(events);

      // Get popular categories
      const popularCategories = analyzePopularCategories(events);

      setAnalytics({
        attendanceRate,
        popularCategories,
        peakTimes,
        trendingScore
      });
    } finally {
      setLoading(false);
    }
  }, [eventId, events]);

  return {
    analytics,
    loading,
    calculateAnalytics
  };
};

const calculateTrendingScore = (event: Event, daysUntilEvent: number): number => {
  const attendanceScore = event.attendees.length / event.capacity;
  const timeScore = Math.exp(-daysUntilEvent / 7); // Exponential decay over a week
  const socialScore = event.socialShares?.length || 0;

  return (attendanceScore * 0.4 + timeScore * 0.4 + socialScore * 0.2);
};

const analyzePeakTimes = (events: Event[]): Record<string, number> => {
  const times: Record<string, number> = {};
  events.forEach(event => {
    const hour = event.date.getHours();
    times[hour] = (times[hour] || 0) + 1;
  });
  return times;
};

const analyzePopularCategories = (events: Event[]): Record<string, number> => {
  const categories: Record<string, number> = {};
  events.forEach(event => {
    categories[event.category] = (categories[event.category] || 0) + 1;
  });
  return categories;
};
```