import { Client } from '@microsoft/microsoft-graph-client';
import { CalendarEvent } from '../types';

export class MicrosoftCalendarService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
  }

  async listEvents(startTime: Date, endTime: Date): Promise<CalendarEvent[]> {
    try {
      const response = await this.client
        .api('/me/calendar/events')
        .filter(`start/dateTime ge '${startTime.toISOString()}' and end/dateTime le '${endTime.toISOString()}'`)
        .get();

      return this.convertToCalendarEvents(response.value);
    } catch (error) {
      console.error('Error fetching Microsoft Calendar events:', error);
      throw error;
    }
  }

  async addEvent(event: CalendarEvent): Promise<void> {
    try {
      await this.client
        .api('/me/calendar/events')
        .post(this.convertToMicrosoftEvent(event));
    } catch (error) {
      console.error('Error adding event to Microsoft Calendar:', error);
      throw error;
    }
  }

  private convertToCalendarEvents(microsoftEvents: any[]): CalendarEvent[] {
    return microsoftEvents.map(event => ({
      id: event.id,
      title: event.subject,
      description: event.bodyPreview,
      date: new Date(event.start.dateTime),
      source: 'microsoft',
      sourceId: event.id
      // ... other fields mapping
    }));
  }

  private convertToMicrosoftEvent(event: CalendarEvent): any {
    return {
      subject: event.title,
      body: {
        contentType: 'text',
        content: event.description
      },
      start: {
        dateTime: event.date.toISOString(),
        timeZone: 'UTC'
      },
      end: {
        dateTime: new Date(event.date.getTime() + 3600000).toISOString(),
        timeZone: 'UTC'
      },
      location: {
        displayName: `${event.location.address}, ${event.location.city}, ${event.location.country}`
      }
    };
  }
}