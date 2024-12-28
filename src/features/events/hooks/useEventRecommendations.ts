```typescript
import { useState, useCallback } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';
import * as turf from '@turf/turf';

interface RecommendationScore {
  event: Event;
  score: number;
  matchingFactors: string[];
}

export const useEventRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useStore(state => state.user);
  const events = useStore(state => state.events);

  const getRecommendations = useCallback(async () => {
    if (!user) return [];

    setLoading(true);
    try {
      const scoredEvents = events.map(event => {
        const matchingFactors: string[] = [];
        let score = 0;

        // Interest match (40%)
        const interestMatch = event.tags.filter(tag => 
          user.interests.includes(tag)
        ).length;
        if (interestMatch > 0) {
          score += (interestMatch / event.tags.length) * 0.4;
          matchingFactors.push('Matches your interests');
        }

        // Location proximity (20%)
        if (user.location?.coordinates && event.location.coordinates) {
          const distance = turf.distance(
            turf.point([user.location.coordinates.longitude, user.location.coordinates.latitude]),
            turf.point([event.location.coordinates.longitude, event.location.coordinates.latitude])
          );
          const proximityScore = Math.max(0, 1 - (distance / 50)); // Within 50km
          score += proximityScore * 0.2;
          if (proximityScore > 0.5) {
            matchingFactors.push('Near you');
          }
        }

        // Social signal (20%)
        const friendsAttending = event.attendees.filter(id => 
          user.connections.includes(id)
        ).length;
        if (friendsAttending > 0) {
          score += Math.min(friendsAttending / 5, 1) * 0.2;
          matchingFactors.push(`${friendsAttending} friends attending`);
        }

        // Time relevance (20%)
        const daysUntilEvent = Math.max(0, (event.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const timeScore = Math.exp(-daysUntilEvent / 30); // Exponential decay over 30 days
        score += timeScore * 0.2;
        if (daysUntilEvent <= 7) {
          matchingFactors.push('Happening soon');
        }

        return { event, score, matchingFactors };
      });

      // Sort by score and take top 10
      const topRecommendations = scoredEvents
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      setRecommendations(topRecommendations);
      return topRecommendations;
    } finally {
      setLoading(false);
    }
  }, [user, events]);

  return {
    recommendations,
    loading,
    getRecommendations
  };
};
```