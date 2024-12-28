```typescript
import * as turf from '@turf/turf';

export class SpatialIndex {
  private quadtree: any;

  constructor() {
    this.quadtree = turf.featureCollection([]);
  }

  addPoint(id: string, lat: number, lon: number) {
    const point = turf.point([lon, lat], { id });
    this.quadtree.features.push(point);
  }

  findNearby(lat: number, lon: number, radiusKm: number) {
    const center = turf.point([lon, lat]);
    const searchArea = turf.circle(center, radiusKm);
    
    return this.quadtree.features.filter(point => 
      turf.booleanPointInPolygon(point, searchArea)
    ).map(point => point.properties.id);
  }

  // Dynamic radius adjustment based on density
  suggestRadius(lat: number, lon: number): number {
    const point = turf.point([lon, lat]);
    const points = this.quadtree.features.length;
    const density = points / 100; // Points per square km
    
    // Adjust radius based on point density
    return Math.max(1, Math.min(50, 10 / density));
  }
}
```