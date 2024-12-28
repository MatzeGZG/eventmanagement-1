export const SUPPORTED_LOCATIONS = {
  ZUG: {
    name: 'Zug',
    lat: 47.1662,
    lon: 8.5155,
    country: 'Switzerland',
    radius: '20km'
  },
  LONDON: {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'United Kingdom',
    radius: '20km'
  }
} as const;

export type LocationKey = keyof typeof SUPPORTED_LOCATIONS;