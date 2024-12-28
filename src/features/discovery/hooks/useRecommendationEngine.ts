import { useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import * as turf from '@turf/turf';

interface ScoringFactors {
  interestMatch: number;
  socialSignal: number;
  timeRelevance: number;
  locationProximity: number;
  userHistory: number;
}

export const useRecommendationEngine = () => {
  const user = useStore(state => state.user);
  const events = useStore(state => state.events);

  const getRecommendations = useCallback(() => {
    if (!user || !events.length) return [];

    return events
      .map(event => ({
        event,
        score: calculateEventScore(event, user),
        factors: calculateScoringFactors(event, user)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ event }) => event);
  }, [user, events]);

  const calculateScoringFactors = (event: Event, user: any): ScoringFactors => {
    // Interest match (35%)
    const interestMatch = event.tags.filter(tag => 
      user.interests.includes(tag)
    ).length / Math.max(event.tags.length, 1) * 35;

    // Social signal (25%)
    const attendanceRate = event.attendees.length / event.capacity;
    const friendsAttending = event.attendees.filter(id => 
      user.connections.includes(id)
    ).length;
    const socialSignal = (attendanceRate * 15 + (friendsAttending * 2)) * 25;

    // Time relevance (20%)
    const now = new Date();
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.max(0, (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const timeRelevance = Math.max(0, (30 - daysUntilEvent) / 30) * 20;

    // Location proximity (10%)
    let locationProximity = 0;
    if (user.location?.coordinates && event.location.coordinates) {
      const distance = turf.distance(
        turf.point([user.location.coordinates.longitude, user.location.coordinates.latitude]),
        turf.point([event.location.coordinates.longitude, event.location.coordinates.latitude])
      );
      locationProximity = Math.max(0, (50 - distance) / 50) * 10;
    }

    // User history (10%)
    const userHistory = calculateUserHistoryScore(event, user) * 10;

    return {
      interestMatch,
      socialSignal,
      timeRelevance,
      locationProximity,
      userHistory
    };
  };

  const calculateEventScore = (event: Event, user: any): number => {
    const factors = calculateScoringFactors(event, user);
    return Object.values(factors).reduce((sum, score) => sum + score, 0);
  };

  const calculateUserHistoryScore = (event: Event, user: any): number => {
    // Calculate based on user's past event attendance and engagement
    const categoryPreference = user.eventHistory?.categories?.[event.category] || 0;
    const organizerPreference = user.eventHistory?.organizers?.[event.organizer.id] || 0;
    
    return (categoryPreference + organizerPreference) / 2;
  };

  return { 
    getRecommendations,
    calculateEventScore,
    calculateScoringFactors
  };
};