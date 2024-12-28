import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '../../types/event';

interface EventMarkerProps {
  event: Event;
  onClick: () => void;
  isHot?: boolean;
}

export const EventMarker: React.FC<EventMarkerProps> = ({
  event,
  onClick,
  isHot
}) => {
  return (
    <button
      onClick={onClick}
      className="transform transition-transform hover:scale-110"
    >
      <div className="relative">
        {isHot && (
          <div className="absolute -inset-2 rounded-full bg-fjs-gold opacity-75 animate-ping" />
        )}
        <MapPin 
          className={`w-8 h-8 relative z-10 ${isHot ? 'text-fjs-gold' : 'text-fjs-silver'}`}
        />
      </div>
    </button>
  );
};