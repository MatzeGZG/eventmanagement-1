```typescript
export interface UserLocation {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  enabled: boolean;
  lastUpdated: Date;
}

export interface LocationPreferences {
  shareLocation: boolean;
  trackingEnabled: boolean;
  radius: number; // in kilometers
}
```