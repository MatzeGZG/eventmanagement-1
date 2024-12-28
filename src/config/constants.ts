export const APP_CONFIG = {
  name: 'FunJetSetter',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  map: {
    defaultCenter: {
      lat: 40.7128,
      lng: -74.0060,
    },
    defaultZoom: 11,
  },
  calendar: {
    syncInterval: 5 * 60 * 1000, // 5 minutes
    maxFutureEvents: 30, // days
  },
  gamification: {
    streakTimeout: 24 * 60 * 60 * 1000, // 24 hours
    pointsMultiplier: {
      basic: 1,
      premium: 1.25,
      elite: 2,
    },
  },
};