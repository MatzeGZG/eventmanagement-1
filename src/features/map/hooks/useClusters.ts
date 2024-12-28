import { useMemo } from 'react';
import * as turf from '@turf/turf';
import { Event } from '../../../types/event';

interface Cluster {
  id: string;
  latitude: number;
  longitude: number;
  events: Event[];
}

export const useClusters = (
  events: Event[],
  maxZoom: number,
  radius: number
): Cluster[] => {
  return useMemo(() => {
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

    const clustered = turf.clustersKmeans(
      turf.featureCollection(points),
      { numberOfClusters: Math.ceil(events.length / 3) }
    );

    const clusters: Cluster[] = [];
    const processed = new Set();

    clustered.features.forEach(feature => {
      const cluster = feature.properties.cluster;
      if (!processed.has(cluster)) {
        const clusterEvents = clustered.features
          .filter(f => f.properties.cluster === cluster)
          .map(f => f.properties.event);

        const center = turf.center(
          turf.featureCollection(
            clusterEvents.map(event => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  event.location.coordinates.longitude,
                  event.location.coordinates.latitude
                ]
              }
            }))
          )
        );

        clusters.push({
          id: `cluster-${cluster}`,
          latitude: center.geometry.coordinates[1],
          longitude: center.geometry.coordinates[0],
          events: clusterEvents
        });

        processed.add(cluster);
      }
    });

    return clusters;
  }, [events, maxZoom, radius]);
};