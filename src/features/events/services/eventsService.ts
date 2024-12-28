import { API_CONFIG } from '../config/api';
import { AppError } from '../../../utils/errorHandling';
import { transformPredictHQEvent } from '../api/transformers/predicthqTransformer';
import { buildEventQueryParams } from '../api/utils/queryBuilder';
import { handleAPIError } from '../api/utils/errorHandler';
import { TEST_EVENTS } from '../../../data/testEvents';

export class EventsService {
  private readonly baseUrl = API_CONFIG.baseUrl;
  private readonly token: string;

  constructor() {
    const token = import.meta.env.VITE_PREDICTHQ_TOKEN;
    if (!token) {
      throw new AppError(
        'PredictHQ API token not configured',
        'PREDICTHQ_CONFIG_ERROR',
        500
      );
    }
    this.token = token;
  }

  async getEventsForLocation(params: {
    lat: number;
    lon: number;
    radius?: string;
    daysAhead?: number;
  }) {
    try {
      const queryParams = buildEventQueryParams(params);
      const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.events}/?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        await handleAPIError(response);
      }

      const data = await response.json();
      return data.results.map(transformPredictHQEvent);
    } catch (error) {
      console.warn('Failed to fetch events from API, using test data:', error);
      // Return filtered test events based on location
      return TEST_EVENTS.filter(event => {
        const distance = this.calculateDistance(
          params.lat,
          params.lon,
          event.location.coordinates.latitude,
          event.location.coordinates.longitude
        );
        return distance <= parseInt(params.radius || API_CONFIG.defaultRadius);
      });
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}

export const eventsService = new EventsService();