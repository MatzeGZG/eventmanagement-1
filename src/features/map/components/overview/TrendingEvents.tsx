import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTrendingEvents } from '../../hooks/useTrendingEvents';

export const TrendingEvents: React.FC = () => {
  const { trendingEvents } = useTrendingEvents();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-fjs-gold" />
        <h2 className="text-lg font-semibold text-fjs-gold">Trending Now</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {trendingEvents.slice(0, 4).map(({ event, metrics }) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="bg-fjs-charcoal rounded-lg p-3"
          >
            <h3 className="text-white font-medium truncate">{event.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm text-fjs-silver">
                <Users className="w-4 h-4 mr-1" />
                {event.attendees.length}/{event.capacity}
              </div>
              <div className="text-sm font-medium text-fjs-gold">
                +{Math.round(metrics.attendeeGrowthRate * 100)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};