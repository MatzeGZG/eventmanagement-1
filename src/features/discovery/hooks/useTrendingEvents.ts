import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';

interface TrendingMetrics {
  attendeeGrowthRate: number;
  socialMomentum: number;
  engagementScore: number;
  timeRelevance: number;
}

export const useTrendingEvents = () => {
  const [trendingEvents, setTrendingEvents] = useState<Array<{
    event: Event;
    metrics: TrendingMetrics;
  }>>([]);

  const events = useStore(state => state.events);

  const calculateTrendingMetrics = useCallback((event: Event): TrendingMetrics => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.max(0, (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate attendee growth rate
    const attendanceRate = event.attendees.length / event.capacity;
    const attendeeGrowthRate = attendanceRate / (daysUntilEvent + 1);

    // Calculate social momentum (based on recent interactions)
    const recentInteractions = event.interactions?.filter(i => 
      (now.getTime() - new Date(i.timestamp).getTime()) < 24 * 60 * 60 * 1000
    ).length || 0;
    const socialMomentum = recentInteractions / 100;

    // Calculate engagement score
    const engagementScore = (
      (event.likes || 0) * 0.3 +
      (event.comments || 0) * 0.4 +
      (event.shares || 0) * 0.3
    ) / 100;

    // Calculate time relevance
    const timeRelevance = Math.exp(-daysUntilEvent / 7); // Exponential decay over a week

    return {
      attendeeGrowthRate,
      socialMomentum,
      engagementScore,
      timeRelevance
    };
  }, []);

  const calculateTrendingScore = useCallback((metrics: TrendingMetrics): number => {
    return (
      metrics.attendeeGrowthRate * 0.4 +
      metrics.socialMomentum * 0.3 +
      metrics.engagementScore * 0.2 +
      metrics.timeRelevance * 0.1
    ) * 100;
  }, []);

  useEffect(() => {
    const updateTrendingEvents = () => {
      const trending = events
        .map(event => {
          const metrics = calculateTrendingMetrics(event);
          return {
            event,
            metrics,
            score: calculateTrendingScore(metrics)
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(({ event, metrics }) => ({ event, metrics }));

      setTrendingEvents(trending);
    };

    updateTrendingEvents();
    const interval = setInterval(updateTrendingEvents, 5 * 60 * 1000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [events, calculateTrendingMetrics, calculateTrendingScore]);

  return { trendingEvents };
};