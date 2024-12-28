```typescript
import * as turf from '@turf/turf';

interface RadiusConfig {
  minRadius: number;
  maxRadius: number;
  targetDensity: number;
  userPreference?: number;
}

export class RadiusOptimizer {
  private static readonly DEFAULT_CONFIG: RadiusConfig = {
    minRadius: 1,
    maxRadius: 50,
    targetDensity: 10 // points per km²
  };

  static optimizeRadius(
    center: [number, number],
    points: Array<{ lat: number; lon: number }>,
    config: Partial<RadiusConfig> = {}
  ): number {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    
    // Start with user preference if available
    let radius = config.userPreference || 
      Math.sqrt(points.length / (Math.PI * finalConfig.targetDensity));

    // Clamp to min/max
    radius = Math.max(
      finalConfig.minRadius,
      Math.min(finalConfig.maxRadius, radius)
    );

    // Calculate actual density
    const area = this.calculateSearchArea(center, radius);
    const pointsInArea = this.countPointsInArea(points, center, radius);
    const density = pointsInArea / area;

    // Adjust radius based on density
    if (density > finalConfig.targetDensity * 1.5) {
      radius *= 0.8; // Reduce radius if too dense
    } else if (density < finalConfig.targetDensity * 0.5) {
      radius *= 1.2; // Increase radius if too sparse
    }

    return Math.max(
      finalConfig.minRadius,
      Math.min(finalConfig.maxRadius, radius)
    );
  }

  private static calculateSearchArea(
    center: [number, number],
    radiusKm: number
  ): number {
    const circle = turf.circle(center, radiusKm);
    return turf.area(circle) / 1000000; // Convert to km²
  }

  private static countPointsInArea(
    points: Array<{ lat: number; lon: number }>,
    center: [number, number],
    radiusKm: number
  ): number {
    const searchArea = turf.circle(center, radiusKm);
    
    return points.filter(point => 
      turf.booleanPointInPolygon(
        turf.point([point.lon, point.lat]),
        searchArea
      )
    ).length;
  }

  static suggestInitialRadius(
    userHistory: Array<{
      lat: number;
      lon: number;
      timestamp: number;
    }>
  ): number {
    if (userHistory.length < 2) {
      return this.DEFAULT_CONFIG.minRadius;
    }

    // Calculate average travel distance
    const distances = [];
    for (let i = 1; i < userHistory.length; i++) {
      const prev = userHistory[i - 1];
      const curr = userHistory[i];
      
      distances.push(
        turf.distance(
          turf.point([prev.lon, prev.lat]),
          turf.point([curr.lon, curr.lat])
        )
      );
    }

    const avgDistance = distances.reduce((a, b) => a + b) / distances.length;
    return Math.max(
      this.DEFAULT_CONFIG.minRadius,
      Math.min(this.DEFAULT_CONFIG.maxRadius, avgDistance * 0.5)
    );
  }
}
```