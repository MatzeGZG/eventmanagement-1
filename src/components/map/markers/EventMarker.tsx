import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '../../../types/event';
import { motion } from 'framer-motion';

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
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="transform transition-transform"
    >
      <div className="relative">
        {isHot && (
          <div className="absolute -inset-2 rounded-full bg-fjs-gold opacity-75 animate-ping" />
        )}
        <MapPin 
          className={`w-8 h-8 relative z-10 ${
            isHot ? 'text-fjs-gold' : 'text-fjs-silver'
          }`}
        />
      </div>
    </motion.button>
  );
};