import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTrendingEvents } from '../../hooks/useTrendingEvents';

export const TrendingEvents: React.FC = () => {
  const { trendingEvents } = useTrendingEvents();

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-fjs-gold" />
        <h2 className="text-lg font-semibold text-fjs-gold">Trending Now</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {trendingEvents.map(event => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="bg-fjs-charcoal rounded-lg p-3"
          >
            <h3 className="text-white font-medium truncate">{event.title}</h3>
            <div className="text-sm text-fjs-silver mt-1">
              {event.attendees.length} attending
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};