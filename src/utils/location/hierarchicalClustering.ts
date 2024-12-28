```typescript
import * as turf from '@turf/turf';

interface Cluster {
  id: string;
  center: [number, number];
  points: Array<{
    id: string;
    coordinates: [number, number];
  }>;
  label?: string;
  subClusters?: Cluster[];
}

export class HierarchicalClusterer {
  private maxDistance: number;
  private minPoints: number;

  constructor(maxDistance = 1, minPoints = 3) {
    this.maxDistance = maxDistance;
    this.minPoints = minPoints;
  }

  cluster(points: Array<{
    id: string;
    coordinates: [number, number];
  }>): Cluster[] {
    if (points.length < this.minPoints) {
      return [{
        id: crypto.randomUUID(),
        center: this.calculateCenter(points.map(p => p.coordinates)),
        points
      }];
    }

    const clusters: Cluster[] = [];
    const visited = new Set<string>();

    points.forEach(point => {
      if (visited.has(point.id)) return;

      const neighbors = this.findNeighbors(point, points);
      if (neighbors.length >= this.minPoints) {
        const cluster = this.expandCluster(point, neighbors, points, visited);
        clusters.push(cluster);
      }
    });

    // Add remaining points as individual clusters
    points.forEach(point => {
      if (!visited.has(point.id)) {
        clusters.push({
          id: crypto.randomUUID(),
          center: point.coordinates,
          points: [point]
        });
      }
    });

    return this.generateLabels(clusters);
  }

  private findNeighbors(
    point: { id: string; coordinates: [number, number] },
    points: Array<{ id: string; coordinates: [number, number] }>
  ) {
    return points.filter(other => 
      point.id !== other.id &&
      turf.distance(
        turf.point(point.coordinates),
        turf.point(other.coordinates)
      ) <= this.maxDistance
    );
  }

  private expandCluster(
    point: { id: string; coordinates: [number, number] },
    neighbors: Array<{ id: string; coordinates: [number, number] }>,
    points: Array<{ id: string; coordinates: [number, number] }>,
    visited: Set<string>
  ): Cluster {
    const cluster: Cluster = {
      id: crypto.randomUUID(),
      center: point.coordinates,
      points: [point, ...neighbors]
    };

    visited.add(point.id);
    neighbors.forEach(n => visited.add(n.id));

    let index = 0;
    while (index < cluster.points.length) {
      const current = cluster.points[index];
      const currentNeighbors = this.findNeighbors(current, points)
        .filter(n => !visited.has(n.id));

      if (currentNeighbors.length >= this.minPoints) {
        currentNeighbors.forEach(n => {
          if (!visited.has(n.id)) {
            visited.add(n.id);
            cluster.points.push(n);
          }
        });
      }

      index++;
    }

    cluster.center = this.calculateCenter(cluster.points.map(p => p.coordinates));

    // Create subclusters if cluster is large enough
    if (cluster.points.length > this.minPoints * 3) {
      const subclusters = this.cluster(cluster.points);
      if (subclusters.length > 1) {
        cluster.subClusters = subclusters;
      }
    }

    return cluster;
  }

  private calculateCenter(coordinates: [number, number][]): [number, number] {
    const center = turf.center(turf.multiPoint(coordinates));
    return center.geometry.coordinates as [number, number];
  }

  private generateLabels(clusters: Cluster[]): Cluster[] {
    return clusters.map(cluster => ({
      ...cluster,
      label: `${cluster.points.length} locations`
    }));
  }
}
```