import { Event } from '../../../types/event';

export const calculateRelevanceScore = (event: Event, userInterests: string[]): number => {
  let score = 0;

  // Match event tags with user interests
  const matchingInterests = event.tags.filter(tag => 
    userInterests.includes(tag)
  ).length;

  // Base score from interest matches (50% weight)
  score += (matchingInterests / Math.max(event.tags.length, 1)) * 50;

  // Popularity score (30% weight)
  const popularityScore = (event.attendees.length / event.capacity) * 30;
  score += popularityScore;

  // Recency score (20% weight)
  const now = new Date();
  const eventDate = new Date(event.date);
  const daysUntilEvent = Math.max(0, (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const recencyScore = Math.max(0, (30 - daysUntilEvent) / 30) * 20;
  score += recencyScore;

  return Math.min(100, score);
};