import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';

interface EventCardProps {
  event: Event;
  showTrendingIndicator?: boolean;
  onRSVP?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  showTrendingIndicator,
  onRSVP
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-fjs-charcoal rounded-xl overflow-hidden shadow-lg hover:shadow-gold transition-all duration-300"
    >
      <div className="relative h-48">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fjs-charcoal via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-fjs-pearl mb-3">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-fjs-silver">
            <Calendar className="w-4 h-4 mr-2 text-fjs-gold" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-fjs-silver">
            <MapPin className="w-4 h-4 mr-2 text-fjs-gold" />
            {event.location.city}, {event.location.country}
          </div>
          <div className="flex items-center text-fjs-silver">
            <Users className="w-4 h-4 mr-2 text-fjs-gold" />
            {event.attendees.length} / {event.capacity} attendees
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-full bg-black/30 text-fjs-gold"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-fjs-pearl">
            {formatCurrency(event.price)}
          </span>
          {onRSVP && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRSVP}
              className="px-4 py-2 bg-gradient-gold text-fjs-charcoal rounded-lg font-medium hover:bg-fjs-light-gold transition-colors"
            >
              RSVP Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};