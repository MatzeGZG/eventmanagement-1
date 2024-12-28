import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '../../types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, eachHourOfInterval } from 'date-fns';
import { EventCell } from '../EventCell';

interface WeekViewProps {
  events: CalendarEvent[];
  date: Date;
}

export const WeekView: React.FC<WeekViewProps> = ({ events, date }) => {
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const hours = eachHourOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-16 border-r border-fjs-charcoal">
        {hours.slice(0, 24).map(hour => (
          <div key={hour.toString()} className="h-12 text-xs text-fjs-silver p-1">
            {format(hour, 'HH:mm')}
          </div>
        ))}
      </div>

      {/* Days columns */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day, dayIndex) => (
          <div key={day.toString()} className="border-r border-fjs-charcoal">
            <div className="sticky top-0 bg-black z-10 p-2 text-center border-b border-fjs-charcoal">
              <div className="text-fjs-silver font-medium">{format(day, 'EEE')}</div>
              <div className="text-fjs-gold">{format(day, 'd')}</div>
            </div>
            <div className="relative">
              {events
                .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                .map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.05 }}
                    className="absolute w-full p-1"
                    style={{
                      top: `${(event.date.getHours() * 60 + event.date.getMinutes()) / 2}px`
                    }}
                  >
                    <EventCell event={event} />
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};