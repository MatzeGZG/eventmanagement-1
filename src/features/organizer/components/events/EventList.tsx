import React from 'react';
import { Calendar, Users, MapPin, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../../../../store';
import { Event } from '../../../../types/event';
import { formatDate } from '../../../../utils/date';

export const EventList: React.FC = () => {
  const events = useStore(state => state.events);
  const user = useStore(state => state.user);
  const deleteEvent = useStore(state => state.deleteEvent);

  const userEvents = events.filter(event => event.organizer.id === user?.id);

  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Create New Event
        </button>
      </div>

      <div className="space-y-4">
        {userEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface EventCardProps {
  event: Event;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const attendanceRate = (event.attendees.length / event.capacity) * 100;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {event.title}
          </h3>
          <div className="space-y-2">
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
        </div>

        <div className="flex items-start space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Edit event"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
            title="Delete event"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Attendance Rate</span>
          <span>{attendanceRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              attendanceRate >= 80 ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${attendanceRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};