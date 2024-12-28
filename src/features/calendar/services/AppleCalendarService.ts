import ICAL from 'ical.js';
import { CalendarEvent } from '../types';

export class AppleCalendarService {
  async exportToICS(events: CalendarEvent[]): Promise<string> {
    const calendar = new ICAL.Component(['vcalendar', [], []]);
    calendar.updatePropertyWithValue('prodid', '-//EventHub//EN');
    calendar.updatePropertyWithValue('version', '2.0');

    events.forEach(event => {
      const vevent = new ICAL.Component('vevent');
      const eventDate = ICAL.Time.fromJSDate(event.date);

      vevent.updatePropertyWithValue('summary', event.title);
      vevent.updatePropertyWithValue('description', event.description);
      vevent.updatePropertyWithValue('dtstart', eventDate);
      vevent.updatePropertyWithValue('location', 
        `${event.location.address}, ${event.location.city}, ${event.location.country}`
      );

      calendar.addSubcomponent(vevent);
    });

    return calendar.toString();
  }

  async importFromICS(icsData: string): Promise<CalendarEvent[]> {
    try {
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      return vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        return {
          id: event.uid,
          title: event.summary,
          description: event.description || '',
          date: event.startDate.toJSDate(),
          source: 'apple',
          sourceId: event.uid
          // ... other fields mapping
        };
      });
    } catch (error) {
      console.error('Error parsing ICS data:', error);
      throw error;
    }
  }
}