import { useStore } from '../../../store';
import { Event, EventCategory } from '../../../types/event';
import { PredictHQAPI } from '../api/predictHQ';
import { AppError } from '../../../utils/errorHandling';

export class EventSyncService {
  private api: PredictHQAPI;

  constructor() {
    this.api = new PredictHQAPI();
  }

  async syncEvents(params: SyncEventsParams): Promise<SyncResult> {
    const result: SyncResult = {
      added: 0,
      updated: 0,
      failed: 0,
      errors: []
    };

    try {
      const response = await this.api.searchEvents({
        ...params,
        limit: params.batchSize || 100
      });

      const store = useStore.getState();
      const existingEvents = store.events;

      for (const apiEvent of response.results) {
        try {
          const transformedEvent = await this.transformToEvent(apiEvent);
          const existingEvent = existingEvents.find(e => e.id === apiEvent.id);

          if (existingEvent) {
            store.updateEvent(transformedEvent);
            result.updated++;
          } else {
            store.addEvent(transformedEvent);
            result.added++;
          }
        } catch (error) {
          result.failed++;
          result.errors.push({
            eventId: apiEvent.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return result;
    } catch (error) {
      throw new AppError(
        'Failed to sync events',
        'SYNC_ERROR',
        500,
        error instanceof Error ? error : undefined
      );
    }
  }

  // ... rest of the class implementation remains the same
}