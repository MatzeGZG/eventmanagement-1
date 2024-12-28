import { useEffect, useState } from 'react';

export const useMapboxGL = () => {
  const [mapboxgl, setMapboxgl] = useState<typeof import('mapbox-gl')>();

  useEffect(() => {
    const loadMapboxGL = async () => {
      try {
        const mapbox = await import('mapbox-gl/dist/mapbox-gl.js');
        await import('mapbox-gl/dist/mapbox-gl.css');
        setMapboxgl(mapbox.default);
      } catch (error) {
        console.error('Failed to load mapbox-gl:', error);
      }
    };

    loadMapboxGL();
  }, []);

  return mapboxgl;
};