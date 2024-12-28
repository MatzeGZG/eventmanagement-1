import { calendar_v3, google } from '@googleapis/calendar';
import { CalendarEvent } from '../types';

export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;

  constructor(accessToken: string) {
    this.calendar = google.calendar({
      version: 'v3',
      auth: accessToken
    });
  }

  async listEvents(timeMin: Date, timeMax: Date): Promise<CalendarEvent[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      return this.convertToCalendarEvents(response.data.items || []);
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  }

  async addEvent(event: CalendarEvent): Promise<void> {
    try {
      await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: this.convertToGoogleEvent(event)
      });
    } catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      throw error;
    }
  }

  private convertToCalendarEvents(googleEvents: calendar_v3.Schema$Event[]): CalendarEvent[] {
    return googleEvents.map(event => ({
      id: event.id!,
      title: event.summary!,
      description: event.description || '',
      date: new Date(event.start?.dateTime || event.start?.date!),
      source: 'google',
      sourceId: event.id
      // ... other fields mapping
    }));
  }

  private convertToGoogleEvent(event: CalendarEvent): calendar_v3.Schema$Event {
    return {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.date.toISOString()
      },
      end: {
        dateTime: new Date(event.date.getTime() + 3600000).toISOString() // Default 1 hour duration
      },
      location: `${event.location.address}, ${event.location.city}, ${event.location.country}`
    };
  }
}