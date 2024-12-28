import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';

interface TrendingMetrics {
  attendeeGrowthRate: number;
  popularity: number;
}

interface TrendingEvent {
  event: Event;
  metrics: TrendingMetrics;
}

export const useTrendingEvents = () => {
  const events = useStore(state => state.events);
  const [trendingEvents, setTrendingEvents] = useState<TrendingEvent[]>([]);

  const calculateTrendingMetrics = useCallback((event: Event): TrendingMetrics => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.max(0, (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate attendance rate and growth
    const attendanceRate = event.attendees.length / event.capacity;
    const attendeeGrowthRate = attendanceRate / (daysUntilEvent + 1);
    
    // Calculate overall popularity score
    const proximity = Math.exp(-daysUntilEvent / 30); // Exponential decay over 30 days
    const popularity = (attendanceRate * 0.7 + proximity * 0.3) * 100;

    return {
      attendeeGrowthRate,
      popularity
    };
  }, []);

  const updateTrendingEvents = useCallback(() => {
    const trending = events
      .map(event => ({
        event,
        metrics: calculateTrendingMetrics(event)
      }))
      .sort((a, b) => b.metrics.popularity - a.metrics.popularity)
      .slice(0, 8);

    setTrendingEvents(trending);
  }, [events, calculateTrendingMetrics]);

  useEffect(() => {
    updateTrendingEvents();
    // Update trending events every 5 minutes
    const interval = setInterval(updateTrendingEvents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [updateTrendingEvents]);

  return { trendingEvents };
};