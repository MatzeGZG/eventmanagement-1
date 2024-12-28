```typescript
import { vi } from 'vitest';

export const useTestLocation = () => {
  const mockCoordinates = {
    latitude: 51.5074,
    longitude: -0.1278
  };

  const mockGeolocation = () => {
    const getCurrentPosition = vi.fn().mockImplementation((success) => 
      success({ coords: mockCoordinates })
    );

    Object.defineProperty(global.navigator, 'geolocation', {
      value: { getCurrentPosition }
    });

    return { getCurrentPosition, coordinates: mockCoordinates };
  };

  return { mockGeolocation };
};
```