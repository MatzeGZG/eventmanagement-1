```typescript
import { PREDICTHQ_CONFIG } from '../../events/api/config';
import { CalendarEvent } from '../types';
import { transformPredictHQEvent } from '../../events/api/transformers';

export class PredictHQCalendarService {
  private readonly baseUrl = PREDICTHQ_CONFIG.baseUrl;
  private readonly token = PREDICTHQ_CONFIG.token;

  async getEvents(params: {
    location: { lat: number; lon: number; radius?: string };
    dateRange: { start: Date; end: Date };
    categories?: string[];
  }): Promise<CalendarEvent[]> {
    const queryParams = new URLSearchParams({
      'location.around': `${params.location.lat},${params.location.lon},${params.location.radius || '20km'}`,
      'start.gte': params.dateRange.start.toISOString(),
      'start.lte': params.dateRange.end.toISOString(),
      'sort': 'rank',
      'limit': '100'
    });

    if (params.categories?.length) {
      queryParams.append('category', params.categories.join(','));
    }

    const response = await fetch(`${this.baseUrl}/events/?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events from PredictHQ');
    }

    const data = await response.json();
    return data.results.map((event: any) => ({
      ...transformPredictHQEvent(event),
      source: 'predictHQ'
    }));
  }
}

export const predictHQCalendarService = new PredictHQCalendarService();
```