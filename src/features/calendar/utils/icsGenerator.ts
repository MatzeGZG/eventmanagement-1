```typescript
import { Event } from '../../../types/event';

export const generateICS = async (events: Event[]): Promise<string> => {
  const icsEvents = events.map(event => {
    const dateFormat = (date: Date) => 
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return `
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${dateFormat(new Date())}
DTSTART:${dateFormat(event.date)}
DTEND:${dateFormat(new Date(event.date.getTime() + 2 * 60 * 60 * 1000))}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location.address}, ${event.location.city}, ${event.location.country}
CATEGORIES:${event.category}
END:VEVENT`.trim();
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FunJetSetter//Calendar//EN
CALSCALE:GREGORIAN
${icsEvents}
END:VCALENDAR`;
};
```