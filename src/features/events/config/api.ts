export const API_CONFIG = {
  baseUrl: 'https://api.predicthq.com/v1',
  defaultRadius: '20km',
  defaultLimit: 100,
  defaultDaysAhead: 30,
  endpoints: {
    events: '/events',
    categories: '/categories',
    places: '/places'
  }
} as const;