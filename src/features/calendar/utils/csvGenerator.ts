```typescript
import { Event } from '../../../types/event';

export const generateCSV = async (events: Event[]): Promise<string> => {
  const headers = [
    'Title',
    'Date',
    'Category',
    'Location',
    'Capacity',
    'Attendees',
    'Price',
    'Status'
  ];

  const rows = events.map(event => [
    event.title,
    event.date.toISOString(),
    event.category,
    `${event.location.address}, ${event.location.city}, ${event.location.country}`,
    event.capacity,
    event.attendees.length,
    event.price,
    event.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => 
        typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
      ).join(',')
    )
  ].join('\n');

  return csvContent;
};
```