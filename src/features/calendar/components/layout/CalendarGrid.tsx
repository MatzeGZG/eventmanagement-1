import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../../types/event';
import { useCalendarGrid } from '../../hooks/useCalendarGrid';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

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
    <div className="h-full overflow-auto">
      <div className="min-w-[640px]"> {/* Minimum width to prevent squishing */}
        <div className="grid grid-cols-7 gap-px bg-fjs-charcoal">
          {/* Weekday Headers - Sticky */}
          <div className="col-span-7 grid grid-cols-7 bg-black sticky top-0 z-10">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-fjs-silver font-medium">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          {days.map((day, index) => (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="aspect-square p-2 bg-black"
            >
              <div className="text-fjs-silver text-sm mb-1">{day.getDate()}</div>
              <div className="space-y-1 overflow-y-auto max-h-[calc(100%-2rem)]">
                {events
                  .filter(event => event.date.toDateString() === day.toDateString())
                  .map(event => (
                    <div
                      key={event.id}
                      className="p-1 bg-fjs-charcoal rounded text-xs text-fjs-gold truncate hover:bg-fjs-charcoal/80 cursor-pointer"
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};