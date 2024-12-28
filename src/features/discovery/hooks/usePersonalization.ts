```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { useLocation } from '../../../hooks/useLocation';
import { Event } from '../../../types/event';
import { useRecommendationEngine } from './useRecommendationEngine';
import { useTrendingEvents } from './useTrendingEvents';

export const usePersonalization = () => {
  const [personalizedEvents, setPersonalizedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);
  const events = useStore(state => state.events);
  const { coordinates } = useLocation();
  const { getRecommendations } = useRecommendationEngine();
  const { trendingEvents } = useTrendingEvents();

  // Get personalized recommendations
  const updateRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      // Get AI-powered recommendations
      const recommendations = await getRecommendations();

      // Filter by location if available
      const nearbyEvents = coordinates ? recommendations.filter(event => {
        const distance = calculateDistance(
          coordinates.latitude,
          coordinates.longitude,
          event.location.coordinates.latitude,
          event.location.coordinates.longitude
        );
        return distance <= 50; // Within 50km
      }) : recommendations;

      // Combine with trending events
      const trending = trendingEvents.map(({ event }) => event);
      
      // Deduplicate and sort by relevance
      const combined = [...new Set([...nearbyEvents, ...trending])];
      
      setPersonalizedEvents(combined);
    } finally {
      setLoading(false);
    }
  }, [coordinates, getRecommendations, trendingEvents]);

  // Update recommendations when relevant data changes
  useEffect(() => {
    updateRecommendations();
  }, [updateRecommendations, user?.interests, events]);

  return {
    personalizedEvents,
    loading,
    refresh: updateRecommendations
  };
};

// Helper function to calculate distance between coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};
```