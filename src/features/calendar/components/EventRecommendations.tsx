```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CalendarEvent } from '../types';
import { formatDate } from '../../../utils/date';

interface EventRecommendationsProps {
  events: CalendarEvent[];
}

export const EventRecommendations: React.FC<EventRecommendationsProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-fjs-gold" />
        <h3 className="text-lg font-semibold text-fjs-gold">Recommended Events</h3>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 rounded-lg p-3 cursor-pointer hover:bg-black/40 transition-colors"
          >
            <h4 className="text-white font-medium mb-1">{event.title}</h4>
            <p className="text-sm text-fjs-silver mb-2">
              {formatDate(event.date)}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-fjs-silver">
                via {event.source}
              </span>
              <button className="text-xs text-fjs-gold hover:text-fjs-light-gold">
                Add to Calendar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```