import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';

interface EventDetailsProps {
  event: Event;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center text-xs text-fjs-silver">
        <Calendar className="w-3 h-3 mr-1" />
        {formatDate(event.date)}
      </div>
      <div className="flex items-center text-xs text-fjs-silver">
        <MapPin className="w-3 h-3 mr-1" />
        {event.location.city}
      </div>
      <div className="flex items-center text-xs text-fjs-silver">
        <Users className="w-3 h-3 mr-1" />
        {event.attendees.length}/{event.capacity}
      </div>
    </div>
  );
};