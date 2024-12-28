```typescript
import { useState, useCallback } from 'react';
import * as turf from '@turf/turf';
import { Event } from '../../../types/event';

interface Cluster {
  id: string;
  center: [number, number];
  events: Event[];
  pointCount: number;
}

export const useLocationClustering = () => {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  const updateClusters = useCallback((events: Event[], zoom: number) => {
    const points = events.map(event => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          event.location.coordinates.longitude,
          event.location.coordinates.latitude
        ]
      },
      properties: { event }
    }));

    const collection = turf.featureCollection(points);
    const radius = Math.max(50, 200 - zoom * 10); // Adjust radius based on zoom

    const clustered = turf.clustersKmeans(collection, {
      numberOfClusters: Math.ceil(events.length / 3),
      mutate: true
    });

    const newClusters = clustered.features.reduce((acc: Cluster[], point: any) => {
      const cluster = acc.find(c => c.id === point.properties.cluster);
      const event = point.properties.event;

      if (cluster) {
        cluster.events.push(event);
        cluster.pointCount++;
      } else {
        acc.push({
          id: point.properties.cluster,
          center: point.geometry.coordinates,
          events: [event],
          pointCount: 1
        });
      }

      return acc;
    }, []);

    setClusters(newClusters);
  }, []);

  return { clusters, updateClusters };
};
```