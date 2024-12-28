import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../../types';
import { formatDate } from '../../../utils/date';

interface EventSuggestionsProps {
  suggestions: Event[];
}

export const EventSuggestions: React.FC<EventSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="mt-4 bg-black rounded-lg shadow-xl border border-fjs-gold">
      {suggestions.map((event) => (
        <div
          key={event.id}
          className="p-4 border-b border-fjs-dark-gold last:border-b-0 hover:bg-fjs-charcoal transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-fjs-gold font-semibold mb-2">
                {event.title}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location.city}, {event.location.country}
                </div>
                <div className="flex items-center text-sm text-white">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees.length} / {event.capacity} attendees
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-fjs-dark-gold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};