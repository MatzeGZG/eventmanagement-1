import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../types/event';
import { useCalendarGrid } from '../../../features/calendar/hooks/useCalendarGrid';
import { LoadingSpinner } from '../../common/LoadingSpinner';

interface CalendarGridProps {
  events?: Event[];
  loading?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  events = [], 
  loading 
}) => {
  const { days, weekDays } = useCalendarGrid();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-7 gap-px bg-fjs-charcoal p-4">
      {weekDays.map(day => (
        <div key={day} className="p-2 text-center text-fjs-silver font-medium">
          {day}
        </div>
      ))}
      
      {days.map((day, index) => (
        <motion.div
          key={day.toISOString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
          className="min-h-[120px] p-2 bg-black"
        >
          <div className="text-fjs-silver mb-2">{day.getDate()}</div>
          <div className="space-y-1">
            {events
              .filter(event => event.date.toDateString() === day.toDateString())
              .map(event => (
                <div
                  key={event.id}
                  className="p-2 bg-fjs-charcoal rounded text-sm text-fjs-gold truncate"
                >
                  {event.title}
                </div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};