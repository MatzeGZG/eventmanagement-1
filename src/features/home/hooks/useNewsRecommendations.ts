import { useState, useEffect } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';
import { NewsItem } from '../types';

export const useNewsRecommendations = (userId?: string) => {
  const [news, setNews] = useState<{
    trending: NewsItem[];
    upcoming: NewsItem[];
  }>({
    trending: [],
    upcoming: []
  });
  const [recommendations, setRecommendations] = useState<NewsItem[]>([]);
  
  const events = useStore(state => state.events);
  const user = useStore(state => state.user);

  useEffect(() => {
    // Ensure each event is only used once across all sections
    const usedEventIds = new Set<string>();

    // Calculate trending events based on attendance and engagement
    const trendingEvents = events
      .filter(event => !usedEventIds.has(event.id))
      .map(event => ({
        ...event,
        score: calculateTrendingScore(event)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Mark trending events as used
    trendingEvents.forEach(event => usedEventIds.add(event.id));

    // Get upcoming events (excluding already used events)
    const upcomingEvents = events
      .filter(event => 
        !usedEventIds.has(event.id) && 
        event.date > new Date()
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);

    // Mark upcoming events as used
    upcomingEvents.forEach(event => usedEventIds.add(event.id));

    setNews({
      trending: trendingEvents.map(eventToNewsItem),
      upcoming: upcomingEvents.map(eventToNewsItem)
    });

    // Generate personalized recommendations if user is logged in
    if (user) {
      const userRecommendations = generateRecommendations(
        events.filter(event => !usedEventIds.has(event.id)),
        user
      );
      setRecommendations(userRecommendations.map(eventToNewsItem));
    }
  }, [events, user]);

  return { news, recommendations };
};

const calculateTrendingScore = (event: Event): number => {
  const attendanceRate = event.attendees.length / event.capacity;
  const daysUntilEvent = Math.max(0, (event.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return (attendanceRate * 0.7 + (1 / (daysUntilEvent + 1)) * 0.3);
};

const eventToNewsItem = (event: Event & { score?: number }): NewsItem => ({
  id: event.id + '-' + Date.now(), // Ensure unique IDs
  title: event.title,
  description: event.description,
  image: event.images[0],
  date: event.date,
  type: 'event',
  relevanceScore: event.score,
  eventId: event.id // Keep original event ID for reference
});

const generateRecommendations = (events: Event[], user: any): Event[] => {
  return events
    .filter(event => event.tags.some(tag => user.interests.includes(tag)))
    .sort((a, b) => {
      const aScore = calculateRelevanceScore(a, user);
      const bScore = calculateRelevanceScore(b, user);
      return bScore - aScore;
    })
    .slice(0, 3);
};

const calculateRelevanceScore = (event: Event, user: any): number => {
  const interestMatch = event.tags.filter(tag => 
    user.interests.includes(tag)
  ).length;
  return interestMatch / event.tags.length;
};