```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { useLocation } from '../../../hooks/useLocation';
import { Event } from '../../../types/event';
import { EventCard } from '../../../components/events/EventCard';

interface LocationBasedEventsProps {
  events: Event[];
}

export const LocationBasedEvents: React.FC<LocationBasedEventsProps> = ({ events }) => {
  const { coordinates } = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-fjs-gold" />
          <h2 className="text-2xl font-bold text-fjs-gold">Near You</h2>
        </div>
        <button className="flex items-center space-x-2 text-fjs-silver hover:text-fjs-gold">
          <Navigation className="w-5 h-5" />
          <span>Update Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```