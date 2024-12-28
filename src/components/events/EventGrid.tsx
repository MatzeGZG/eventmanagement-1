import React from 'react';
import { EventCard } from './EventCard';
import { useStore } from '../../store';
import { Event } from '../../types/event';

interface EventGridProps {
  events: Event[];
}

export const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  const updateEvent = useStore((state) => state.updateEvent);
  const user = useStore((state) => state.user);

  const handleRSVP = (event: Event) => {
    if (!user) return;

    const updatedEvent = {
      ...event,
      attendees: [...event.attendees, user.id],
    };
    updateEvent(updatedEvent);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRSVP={() => handleRSVP(event)}
        />
      ))}
    </div>
  );
};