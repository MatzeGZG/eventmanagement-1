```typescript
import { useCallback } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';
import * as turf from '@turf/turf';

export const useEventRecommendations = () => {
  const user = useStore(state => state.user);
  const events = useStore(state => state.events);

  const getRecommendations = useCallback((
    date: Date,
    maxDistance: number = 10 // km
  ): Event[] => {
    if (!user?.location) return [];

    return events
      .filter(event => {
        // Filter by date (within next 30 days)
        const eventDate = new Date(event.date);
        const daysDiff = (eventDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff < 0 || daysDiff > 30) return false;

        // Filter by distance
        const distance = turf.distance(
          turf.point([user.location.coordinates.longitude, user.location.coordinates.latitude]),
          turf.point([event.location.coordinates.longitude, event.location.coordinates.latitude])
        );
        if (distance > maxDistance) return false;

        // Filter by user interests
        const hasMatchingInterests = event.tags.some(tag => 
          user.interests.includes(tag)
        );
        if (!hasMatchingInterests) return false;

        return true;
      })
      .sort((a, b) => {
        // Score events based on multiple factors
        const scoreA = calculateEventScore(a, user);
        const scoreB = calculateEventScore(b, user);
        return scoreB - scoreA;
      })
      .slice(0, 5); // Return top 5 recommendations
  }, [user, events]);

  return { getRecommendations };
};

const calculateEventScore = (event: Event, user: any): number => {
  let score = 0;

  // Interest match score (0-5)
  const interestMatches = event.tags.filter(tag => 
    user.interests.includes(tag)
  ).length;
  score += interestMatches;

  // Attendance score (0-3)
  const attendanceRatio = event.attendees.length / event.capacity;
  if (attendanceRatio > 0.8) score += 3;
  else if (attendanceRatio > 0.5) score += 2;
  else if (attendanceRatio > 0.2) score += 1;

  // Social score (0-2)
  const friendsAttending = event.attendees.filter(id => 
    user.connections.includes(id)
  ).length;
  score += Math.min(friendsAttending, 2);

  return score;
};
```