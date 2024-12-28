import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '../../types';
import { format, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';
import { EventCell } from '../EventCell';

interface DayViewProps {
  events: CalendarEvent[];
  date: Date;
}

export const DayView: React.FC<DayViewProps> = ({ events, date }) => {
  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date)
  });

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-20 border-r border-fjs-charcoal">
        {hours.map(hour => (
          <div key={hour.toString()} className="h-16 text-sm text-fjs-silver p-2">
            {format(hour, 'HH:mm')}
          </div>
        ))}
      </div>

      {/* Events column */}
      <div className="flex-1 relative">
        {events
          .filter(event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
          .map(event => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute w-full p-2"
              style={{
                top: `${(event.date.getHours() * 60 + event.date.getMinutes()) / 2}px`
              }}
            >
              <EventCell event={event} showDetails />
            </motion.div>
          ))}
      </div>
    </div>
  );
};