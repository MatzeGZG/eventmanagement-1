import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '../../types';
import { format, isToday, isTomorrow, isThisWeek, isThisMonth } from 'date-fns';
import { EventCell } from '../EventCell';

interface AgendaViewProps {
  events: CalendarEvent[];
  date: Date;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ events }) => {
  const groupedEvents = events.reduce((groups, event) => {
    let groupKey = 'Future';

    if (isToday(event.date)) groupKey = 'Today';
    else if (isTomorrow(event.date)) groupKey = 'Tomorrow';
    else if (isThisWeek(event.date)) groupKey = 'This Week';
    else if (isThisMonth(event.date)) groupKey = 'This Month';

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="h-full overflow-auto p-4">
      {Object.entries(groupedEvents).map(([group, groupEvents], index) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-6"
        >
          <h3 className="text-fjs-gold font-semibold mb-4">{group}</h3>
          <div className="space-y-2">
            {groupEvents.map(event => (
              <EventCell key={event.id} event={event} showDetails />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};