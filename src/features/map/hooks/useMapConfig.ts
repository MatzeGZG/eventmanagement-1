```typescript
import { useCallback } from 'react';
import { useLocation } from '../../../hooks/useLocation';

export const useMapConfig = () => {
  const { coordinates } = useLocation();

  const getInitialViewState = useCallback(() => ({
    latitude: coordinates?.latitude || 51.5074,
    longitude: coordinates?.longitude || -0.1278,
    zoom: 11,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  }), [coordinates]);

  return {
    mapStyle: 'mapbox://styles/mapbox/dark-v11',
    minZoom: 2,
    maxZoom: 18,
    getInitialViewState
  };
};
```