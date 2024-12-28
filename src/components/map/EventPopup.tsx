import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/date';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

export const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  return (
    <div className="p-4 max-w-sm bg-black border border-fjs-charcoal rounded-lg">
      <h3 className="text-fjs-gold font-semibold mb-2">{event.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-fjs-silver">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-sm text-fjs-silver">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location.address}
        </div>
        <div className="flex items-center text-sm text-fjs-silver">
          <Users className="w-4 h-4 mr-2" />
          {event.attendees.length} / {event.capacity} attendees
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-fjs-gold text-black py-2 px-4 rounded-md hover:bg-fjs-dark-gold transition-colors"
      >
        Close
      </button>
    </div>
  );
};