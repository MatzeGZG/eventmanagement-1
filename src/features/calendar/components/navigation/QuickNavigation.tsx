```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Circle } from 'lucide-react';
import { Event } from '../../../types/event';
import { format, isSameDay } from 'date-fns';

interface QuickNavigationProps {
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const QuickNavigation: React.FC<QuickNavigationProps> = ({
  events,
  selectedDate,
  onDateSelect
}) => {
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    acc.set(dateKey, (acc.get(dateKey) || []).concat(event));
    return acc;
  }, new Map<string, Event[]>());

  return (
    <div className="bg-fjs-charcoal rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-fjs-gold" />
        <h3 className="text-lg font-medium text-fjs-gold">Quick Navigation</h3>
      </div>

      <div className="space-y-2">
        {Array.from(eventsByDate.entries()).map(([dateStr, dateEvents]) => {
          const date = new Date(dateStr);
          const isSelected = isSameDay(date, selectedDate);
          
          return (
            <motion.button
              key={dateStr}
              onClick={() => onDateSelect(date)}
              className={`
                w-full flex items-center justify-between p-2 rounded-lg
                ${isSelected ? 'bg-fjs-gold text-black' : 'hover:bg-black/20'}
              `}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={isSelected ? 'text-black' : 'text-white'}>
                {format(date, 'MMM d, yyyy')}
              </span>
              <div className="flex items-center space-x-1">
                {dateEvents.map((_, i) => (
                  <Circle
                    key={i}
                    className={`w-2 h-2 fill-current ${
                      isSelected ? 'text-black' : 'text-fjs-gold'
                    }`}
                  />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
```