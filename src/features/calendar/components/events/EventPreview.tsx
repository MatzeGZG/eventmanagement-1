import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Event } from '../../../../types/event';
import { formatTime } from '../../utils/formatters';

interface EventPreviewProps {
  event: Event;
}

export const EventPreview: React.FC<EventPreviewProps> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-2 bg-fjs-charcoal rounded-lg cursor-pointer hover:shadow-lg hover:shadow-fjs-gold/10 transition-all"
    >
      <div className="text-sm font-medium text-fjs-gold truncate">
        {event.title}
      </div>
      <div className="flex items-center text-xs text-fjs-silver mt-1">
        <Clock className="w-3 h-3 mr-1" />
        {formatTime(event.date)}
      </div>
    </motion.div>
  );
};