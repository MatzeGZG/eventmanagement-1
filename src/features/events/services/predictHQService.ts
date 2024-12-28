```typescript
import { AppError } from '../../../utils/errorHandling';
import { Event } from '../../../types/event';
import { TEST_EVENTS } from '../../../data/testEvents';
import { transformPredictHQEvent } from '../api/transformers/predicthqTransformer';
import { EventCache } from '../utils/eventCache';

interface EventParams {
  location: {
    lat: number;
    lon: number;
    radius?: string;
  };
}

export class PredictHQService {
  private static readonly BASE_URL = 'https://api.predicthq.com/v1';
  private static readonly TOKEN = import.meta.env.VITE_PREDICTHQ_TOKEN;

  static async getEvents(params: EventParams): Promise<Event[]> {
    try {
      // Check cache first
      const cacheKey = `events-${params.location.lat}-${params.location.lon}`;
      const cachedEvents = EventCache.get(cacheKey);
      if (cachedEvents) return cachedEvents;

      if (!this.TOKEN) {
        throw new AppError('PredictHQ API token not configured', 'CONFIG_ERROR');
      }

      const queryString = new URLSearchParams({
        'location.around': `${params.location.lat},${params.location.lon},${params.location.radius || '20km'}`,
        'sort': 'rank',
        'limit': '10'
      });

      const response = await fetch(
        `${this.BASE_URL}/events/?${queryString}`,
        {
          headers: {
            'Authorization': `Bearer ${this.TOKEN}`,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new AppError(
          await this.getErrorMessage(response),
          'API_ERROR',
          response.status
        );
      }

      const data = await response.json();
      const events = data.results.map(transformPredictHQEvent);
      
      // Cache the results
      EventCache.set(cacheKey, events);
      
      return events;
    } catch (error) {
      console.warn('Using test data while connecting to PredictHQ:', error);
      return TEST_EVENTS.filter(event => 
        event.location.coordinates.latitude === params.location.lat &&
        event.location.coordinates.longitude === params.location.lon
      );
    }
  }

  private static async getErrorMessage(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.error || `API request failed with status ${response.status}`;
    } catch {
      return `API request failed with status ${response.status}`;
    }
  }
}
```