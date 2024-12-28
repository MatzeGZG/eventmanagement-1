```typescript
import { useState, useEffect, useCallback } from 'react';
import { GeofenceManager } from '../utils/location/geofencing';

export const useLocationTracking = (options = { enableHighAccuracy: true }) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePositionUpdate = useCallback((position: GeolocationPosition) => {
    setLocation(position);
    
    // Check geofences when location updates
    GeofenceManager.checkGeofences([
      position.coords.latitude,
      position.coords.longitude
    ]);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      (error) => setError(error.message),
      {
        ...options,
        timeout: 10000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [handlePositionUpdate, options]);

  return { location, error };
};
```