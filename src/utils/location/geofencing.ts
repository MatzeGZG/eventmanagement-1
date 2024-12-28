```typescript
export class GeofenceManager {
  private static geofences = new Map<string, {
    center: [number, number];
    radius: number;
    onEnter?: () => void;
    onExit?: () => void;
  }>();

  static addGeofence(
    id: string,
    center: [number, number],
    radius: number,
    callbacks?: {
      onEnter?: () => void;
      onExit?: () => void;
    }
  ) {
    this.geofences.set(id, { center, radius, ...callbacks });
  }

  static checkGeofences(currentLocation: [number, number]) {
    this.geofences.forEach((fence, id) => {
      const distance = this.calculateDistance(
        currentLocation,
        fence.center
      );

      const wasInside = this.isInside(id);
      const isInside = distance <= fence.radius;

      if (isInside && !wasInside) {
        fence.onEnter?.();
      } else if (!isInside && wasInside) {
        fence.onExit?.();
      }
    });
  }

  private static calculateDistance(
    point1: [number, number],
    point2: [number, number]
  ): number {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    const R = 6371; // Earth's radius in km

    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  private static isInside(fenceId: string): boolean {
    // Track which geofences the user is currently inside
    return false; // Implement state tracking
  }
}
```