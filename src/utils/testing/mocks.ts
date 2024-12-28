import { vi } from 'vitest';

export const mockMapboxGL = {
  Map: vi.fn(),
  NavigationControl: vi.fn(),
  GeolocateControl: vi.fn(),
  Marker: vi.fn(),
  Popup: vi.fn()
};

export const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
  clearWatch: vi.fn()
};

export const setupMocks = () => {
  vi.mock('mapbox-gl', () => mockMapboxGL);
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation
  });
};