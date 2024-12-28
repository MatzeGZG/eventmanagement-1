```typescript
import { useCallback } from 'react';
import { Event } from '../../../types/event';
import * as turf from '@turf/turf';

interface TravelTimeEstimate {
  duration: number; // in minutes
  distance: number; // in kilometers
  mode: 'driving' | 'transit' | 'walking';
}

export const useTravelTime = () => {
  const calculateTravelTime = useCallback(async (
    fromEvent: Event,
    toEvent: Event
  ): Promise<TravelTimeEstimate> => {
    const from = [fromEvent.location.coordinates.longitude, fromEvent.location.coordinates.latitude];
    const to = [toEvent.location.coordinates.longitude, toEvent.location.coordinates.latitude];

    // Calculate straight-line distance
    const distance = turf.distance(
      turf.point(from),
      turf.point(to),
      { units: 'kilometers' }
    );

    // Estimate travel times for different modes
    const estimates = {
      driving: Math.round(distance * 2), // ~30 km/h average with traffic
      transit: Math.round(distance * 3), // ~20 km/h average
      walking: Math.round(distance * 12) // ~5 km/h average
    };

    // Select best mode based on distance
    let mode: 'driving' | 'transit' | 'walking' = 'driving';
    if (distance <= 1) mode = 'walking';
    else if (distance <= 5) mode = 'transit';

    return {
      duration: estimates[mode],
      distance,
      mode
    };
  }, []);

  return { calculateTravelTime };
};
```