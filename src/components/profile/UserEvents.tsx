import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useStore } from '../../store';
import { formatDate } from '../../utils/date';

export const UserEvents = () => {
  const user = useStore((state) => state.user);
  const events = useStore((state) => state.events);

  if (!user) return null;

  const userEvents = events.filter((event) => 
    event.attendees.includes(user.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Events
      </h2>
      <div className="space-y-4">
        {userEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location.city}, {event.location.country}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};