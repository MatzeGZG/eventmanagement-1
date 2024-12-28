```typescript
import { useState, useCallback } from 'react';

interface MapLayers {
  clusters: boolean;
  heatmap: boolean;
  terrain: boolean;
}

export const useMapLayers = () => {
  const [layers, setLayers] = useState<MapLayers>({
    clusters: true,
    heatmap: false,
    terrain: true
  });

  const toggleLayer = useCallback((layer: keyof MapLayers) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  }, []);

  return {
    layers,
    toggleLayer
  };
};
```