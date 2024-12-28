import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '../../../../types/event';
import { colors } from '../../../../styles/colors';

interface EventMarkerProps {
  event: Event;
  onClick: (event: Event) => void;
  isHot?: boolean;
}

export const EventMarker: React.FC<EventMarkerProps> = ({
  event,
  onClick,
  isHot
}) => {
  const markerColor = isHot ? colors.accent.warning : colors.primary.gold;

  return (
    <button
      onClick={() => onClick(event)}
      className="transform transition-transform hover:scale-110"
    >
      <div className="relative">
        {isHot && (
          <div className="absolute -inset-2 rounded-full bg-current opacity-75 animate-ping" />
        )}
        <MapPin 
          className="w-8 h-8 relative z-10" 
          style={{ color: markerColor }}
        />
      </div>
    </button>
  );
};