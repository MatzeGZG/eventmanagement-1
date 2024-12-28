import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '../../types';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth } from 'date-fns';
import { EventCell } from '../EventCell';

interface MonthViewProps {
  events: CalendarEvent[];
  date: Date;
}

export const MonthView: React.FC<MonthViewProps> = ({ events, date }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-px bg-fjs-charcoal h-full">
      {days.map((day, index) => (
        <motion.div
          key={day.toISOString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
          className={`min-h-[100px] p-2 bg-black ${
            !isSameMonth(day, date) ? 'opacity-50' : ''
          }`}
        >
          <div className="text-fjs-silver mb-2">{format(day, 'd')}</div>
          <div className="space-y-1">
            {events
              .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
              .map(event => (
                <EventCell key={event.id} event={event} />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};