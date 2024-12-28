import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';

interface TrendingEvent {
  id: string;
  title: string;
  attendees: string[];
  trendingScore: number;
}

export const useTrendingEvents = () => {
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const events = useStore(state => state.events);

  const calculateTrendingScore = useCallback((event: Event): number => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.max(0, (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate attendance rate
    const attendanceRate = event.attendees.length / event.capacity;
    
    // Events happening sooner get higher scores
    const proximityScore = Math.exp(-daysUntilEvent / 30); // Exponential decay over 30 days
    
    // Combine factors into final score
    return (attendanceRate * 0.7 + proximityScore * 0.3) * 100;
  }, []);

  useEffect(() => {
    const trending = events
      .map(event => ({
        ...event,
        trendingScore: calculateTrendingScore(event)
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 4); // Get top 4 trending events

    setTrendingEvents(trending);
  }, [events, calculateTrendingScore]);

  return { trendingEvents };
};