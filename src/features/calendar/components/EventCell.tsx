import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';
import { EventDetails } from './EventDetails';

interface EventCellProps {
  event: Event;
  showDetails?: boolean;
}

export const EventCell: React.FC<EventCellProps> = ({ event, showDetails }) => {
  const user = useStore(state => state.user);

  const matchesUserInterests = (event: Event): boolean => {
    if (!user?.interests) return false;
    return event.tags.some(tag => user.interests.includes(tag));
  };

  const isHighlighted = matchesUserInterests(event);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        p-3 rounded-lg cursor-pointer transition-colors
        ${isHighlighted 
          ? 'bg-fjs-gold/20 hover:bg-fjs-gold/30'
          : 'bg-fjs-charcoal hover:bg-fjs-charcoal/80'
        }
      `}
    >
      <div className="text-sm font-medium text-fjs-gold truncate">
        {event.title}
      </div>
      
      {showDetails && <EventDetails event={event} />}
    </motion.div>
  );
};