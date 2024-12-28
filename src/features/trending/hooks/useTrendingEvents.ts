```typescript
import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../../store';
import { TrendingMetrics } from '../../search/types';

export const useTrendingEvents = () => {
  const events = useStore(state => state.events);
  const [trendingEvents, setTrendingEvents] = useState<Array<{
    event: typeof events[0];
    metrics: TrendingMetrics;
  }>>([]);

  const calculateTrendingScore = useCallback((event: typeof events[0]) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate base metrics
    const attendeeRatio = event.attendees.length / event.capacity;
    const rsvpRate = event.attendees.length / (daysUntilEvent + 1);
    
    // Calculate trending score
    const score = (
      (attendeeRatio * 0.4) +
      (rsvpRate * 0.3) +
      (event.socialShares?.length || 0) * 0.2 +
      (event.views || 0) * 0.1
    );

    return {
      score,
      metrics: {
        attendeeGrowthRate: rsvpRate,
        viewCount: event.views || 0,
        rsvpRate: attendeeRatio,
        socialShares: event.socialShares?.length || 0,
        lastUpdated: new Date()
      }
    };
  }, []);

  const updateTrendingEvents = useCallback(() => {
    const trending = events
      .map(event => ({
        event,
        ...calculateTrendingScore(event)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ event, metrics }) => ({ event, metrics }));

    setTrendingEvents(trending);
  }, [events, calculateTrendingScore]);

  useEffect(() => {
    updateTrendingEvents();
    const interval = setInterval(updateTrendingEvents, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [updateTrendingEvents]);

  return {
    trendingEvents,
    updateTrendingEvents
  };
};
```