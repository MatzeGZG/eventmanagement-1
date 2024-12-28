import { API_CONFIG } from '../../config/api';

export const buildEventQueryParams = (params: {
  lat: number;
  lon: number;
  radius?: string;
  daysAhead?: number;
}): URLSearchParams => {
  const { lat, lon, radius = API_CONFIG.defaultRadius, daysAhead = API_CONFIG.defaultDaysAhead } = params;
  
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysAhead);

  return new URLSearchParams({
    'location.around': `${lat},${lon},${radius}`,
    'start.lte': endDate.toISOString(),
    'start.gte': new Date().toISOString(),
    'sort': 'rank',
    'limit': API_CONFIG.defaultLimit.toString()
  });
};