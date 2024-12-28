```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { UserLocation, LocationPreferences } from '../types';

export const useUserLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUser } = useStore();

  const updateLocation = useCallback(async () => {
    if (!user?.locationPreferences?.shareLocation) return;

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const newLocation: UserLocation = {
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        enabled: true,
        lastUpdated: new Date()
      };

      updateUser({
        ...user,
        location: newLocation
      });
    } catch (err) {
      setError('Unable to get your location. Please check your settings.');
    } finally {
      setLoading(false);
    }
  }, [user, updateUser]);

  const toggleLocationSharing = useCallback((enabled: boolean) => {
    if (!user) return;

    const preferences: LocationPreferences = {
      ...user.locationPreferences || {},
      shareLocation: enabled,
      trackingEnabled: enabled
    };

    updateUser({
      ...user,
      locationPreferences: preferences,
      location: enabled ? user.location : { ...user.location, enabled: false }
    });

    if (enabled) {
      updateLocation();
    }
  }, [user, updateUser, updateLocation]);

  useEffect(() => {
    if (user?.locationPreferences?.trackingEnabled) {
      updateLocation();
    }
  }, [user?.locationPreferences?.trackingEnabled, updateLocation]);

  return {
    location: user?.location,
    preferences: user?.locationPreferences,
    loading,
    error,
    updateLocation,
    toggleLocationSharing
  };
};
```