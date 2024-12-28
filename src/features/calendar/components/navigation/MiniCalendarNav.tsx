```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Circle } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { Event } from '../../../../types/event';

interface MiniCalendarNavProps {
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const MiniCalendarNav: React.FC<MiniCalendarNavProps> = ({
  events,
  selectedDate,
  onDateSelect
}) => {
  // Calculate event density for each date
  const eventDensity = events.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getDensityIndicator = (date: Date) => {
    const count = eventDensity[date.toDateString()] || 0;
    if (count === 0) return null;
    
    return (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
          <Circle
            key={i}
            className="w-1 h-1 fill-current text-fjs-gold"
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-lg p-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-fjs-gold" />
        <h3 className="text-lg font-medium text-fjs-gold">Quick Nav</h3>
      </div>

      {/* Calendar grid implementation */}
      <div className="grid grid-cols-7 gap-1">
        {/* Calendar cells with density indicators */}
      </div>
    </motion.div>
  );
};
```