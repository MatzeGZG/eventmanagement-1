import { useState, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const LONDON_COORDINATES = {
  latitude: 51.5074,
  longitude: -0.1278
};

export const useLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>(LONDON_COORDINATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (!navigator?.geolocation) {
          throw new Error('Geolocation is not supported');
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (err) {
        console.warn('Using London as fallback location:', err);
        setError('Could not get your location. Showing London area instead.');
        setCoordinates(LONDON_COORDINATES);
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  return { coordinates, loading, error };
};