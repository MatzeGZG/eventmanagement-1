import React from 'react';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../store';
import { usePoints } from '../../../hooks/usePoints';

interface EventPopupProps {
  event: Event;
}

export const EventPopup: React.FC<EventPopupProps> = ({ event }) => {
  const user = useStore(state => state.user);
  const updateEvent = useStore(state => state.updateEvent);
  const { awardPoints } = usePoints();

  const handleRSVP = () => {
    if (!user) return;

    updateEvent({
      ...event,
      attendees: [...event.attendees, user.id]
    });

    awardPoints(10);
  };

  const isAttending = user && event.attendees.includes(user.id);
  const matchingInterests = user?.interests.filter(interest => 
    event.tags.includes(interest)
  );

  return (
    <div className="p-4 max-w-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
        {matchingInterests && matchingInterests.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {matchingInterests.map(interest => (
              <span
                key={interest}
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full"
              >
                Matches your {interest} interest
              </span>
            ))}
          </div>
        )}
      </div>

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
        <div className="flex items-center text-sm text-gray-600">
          <Tag className="w-4 h-4 mr-2" />
          {event.tags.join(', ')}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(event.price)}
        </span>
        <button
          onClick={handleRSVP}
          disabled={isAttending}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isAttending
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isAttending ? 'Attending' : 'RSVP (+10 pts)'}
        </button>
      </div>
    </div>
  );
};