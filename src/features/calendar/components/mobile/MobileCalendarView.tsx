```typescript
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { format, addMonths } from 'date-fns';
import { Event } from '../../../types/event';

interface MobileCalendarViewProps {
  events: Event[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const MobileCalendarView: React.FC<MobileCalendarViewProps> = ({
  events,
  selectedDate,
  onDateChange
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onDateChange(addMonths(selectedDate, 1)),
    onSwipedRight: () => onDateChange(addMonths(selectedDate, -1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const eventsForDate = events.filter(event => 
    event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="h-full flex flex-col" {...handlers}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-fjs-charcoal">
        <button
          onClick={() => onDateChange(addMonths(selectedDate, -1))}
          className="p-2 text-fjs-silver hover:text-fjs-gold"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-fjs-gold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => onDateChange(addMonths(selectedDate, 1))}
          className="p-2 text-fjs-silver hover:text-fjs-gold"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {eventsForDate.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {eventsForDate.map(event => (
                <motion.div
                  key={event.id}
                  layoutId={event.id}
                  className="bg-fjs-charcoal rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-fjs-gold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-fjs-silver text-sm">
                    {format(event.date, 'h:mm a')}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-fjs-silver"
            >
              <Calendar className="w-12 h-12 mb-4 text-fjs-gold" />
              <p>No events scheduled for this day</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
```