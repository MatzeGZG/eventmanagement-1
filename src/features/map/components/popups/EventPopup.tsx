import React from 'react';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '../../../../types/event';
import { formatDate } from '../../../../utils/date';
import { formatCurrency } from '../../../../utils/currency';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
  onRSVP?: () => void;
}

export const EventPopup: React.FC<EventPopupProps> = ({
  event,
  onClose,
  onRSVP
}) => {
  return (
    <div className="p-4 max-w-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location.address}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {event.attendees.length} / {event.capacity} attendees
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(event.price)}
        </span>
        {onRSVP && (
          <button
            onClick={onRSVP}
            className="px-4 py-2 bg-fjs-gold text-black rounded-md hover:bg-fjs-dark-gold transition-colors"
          >
            RSVP
          </button>
        )}
      </div>
    </div>
  );
};