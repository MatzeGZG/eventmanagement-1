import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '../../../../types/event';
import { getEventTimingColor, getMarkerSize } from '../../utils/markerHelpers';

interface EventMarkerWithTimingProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventMarkerWithTiming: React.FC<EventMarkerWithTimingProps> = ({
  event,
  onClick
}) => {
  const color = getEventTimingColor(event.date);
  const size = getMarkerSize(event.attendees.length, event.capacity);

  return (
    <button
      onClick={() => onClick(event)}
      className="transform transition-transform hover:scale-110"
      style={{ width: size, height: size }}
    >
      <div className="relative">
        <div className={`absolute -inset-2 rounded-full bg-current opacity-75 animate-ping`} 
             style={{ color }} />
        <MapPin 
          className="relative z-10" 
          style={{ color, width: size, height: size }}
        />
      </div>
    </button>
  );
};