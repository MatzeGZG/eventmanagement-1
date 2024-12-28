import React from 'react';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';
import { motion } from 'framer-motion';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

export const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 max-w-sm bg-black rounded-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold text-fjs-gold mb-3">{event.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-fjs-silver">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-sm text-fjs-silver">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location.address}
        </div>
        <div className="flex items-center text-sm text-fjs-silver">
          <Users className="w-4 h-4 mr-2" />
          {event.attendees.length} / {event.capacity} attendees
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {event.tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-fjs-charcoal text-fjs-silver"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="w-full py-2 bg-fjs-gold text-black rounded-lg font-medium hover:bg-fjs-light-gold transition-colors"
      >
        Close
      </motion.button>
    </motion.div>
  );
};