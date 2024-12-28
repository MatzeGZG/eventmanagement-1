export const PREDICTHQ_CONFIG = {
  baseUrl: 'https://api.predicthq.com/v1',
  token: import.meta.env.VITE_PREDICTHQ_TOKEN,
  defaultRadius: '20km',
  defaultLimit: 100,
  locations: {
    zug: {
      lat: 47.1662,
      lon: 8.5155,
      name: 'Zug, Switzerland'
    }
  },
  categories: {
    concerts: 'concerts',
    conferences: 'conferences',
    expos: 'expos',
    festivals: 'festivals',
    performing_arts: 'performing-arts',
    sports: 'sports',
    community: 'community'
  }
} as const;