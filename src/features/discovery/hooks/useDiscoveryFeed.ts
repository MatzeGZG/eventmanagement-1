import { useState, useEffect } from 'react';
import { useStore } from '../../../store';
import { useLocation } from '../../../hooks/useLocation';
import { Event } from '../../../types/event';
import { calculateRelevanceScore } from '../utils/relevanceCalculator';

export const useDiscoveryFeed = () => {
  const [loading, setLoading] = useState(true);
  const [personalizedEvents, setPersonalizedEvents] = useState<Event[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<Event[]>([]);
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);

  const user = useStore(state => state.user);
  const events = useStore(state => state.events);
  const { coordinates } = useLocation();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        // Filter personalized events based on user interests
        const personalized = events
          .map(event => ({
            event,
            score: calculateRelevanceScore(event, user?.interests || [])
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map(({ event }) => event);

        setPersonalizedEvents(personalized);

        // Filter nearby events based on location
        const nearby = events
          .filter(event => {
            if (!coordinates) return false;
            // Simple distance calculation - replace with proper geolocation
            const distance = Math.sqrt(
              Math.pow(event.location.coordinates.latitude - coordinates.latitude, 2) +
              Math.pow(event.location.coordinates.longitude - coordinates.longitude, 2)
            );
            return distance < 0.1; // Roughly 10km
          })
          .slice(0, 6);

        setNearbyEvents(nearby);

        // Get popular events based on attendee count
        const popular = [...events]
          .sort((a, b) => b.attendees.length - a.attendees.length)
          .slice(0, 6);

        setPopularEvents(popular);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [events, user, coordinates]);

  return {
    loading,
    personalizedEvents,
    nearbyEvents,
    popularEvents
  };
};