import { vi } from 'vitest';

export const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(),
    onAuthStateChange: vi.fn()
  },
  from: vi.fn(() => ({
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }))
};

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