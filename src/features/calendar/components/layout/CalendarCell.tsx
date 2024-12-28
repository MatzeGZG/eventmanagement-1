import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { Event } from '../../../../types/event';
import { EventPreview } from '../events/EventPreview';

interface CalendarCellProps {
  date: Date;
  events: Event[];
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ date, events }) => {
  const isCurrentMonth = isSameMonth(date, new Date());

  return (
    <div className={`min-h-[120px] p-2 bg-black ${
      !isCurrentMonth ? 'opacity-50' : ''
    }`}>
      <div className="text-fjs-silver mb-2">{format(date, 'd')}</div>
      <div className="space-y-1">
        {events.map(event => (
          <EventPreview key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};