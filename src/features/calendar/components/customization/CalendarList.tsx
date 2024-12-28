import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Settings, Trash2 } from 'lucide-react';
import { CustomCalendar } from '../../types/customCalendar';

interface CalendarListProps {
  calendars: CustomCalendar[];
  activeCalendarId?: string;
  onCalendarSelect: (calendar: CustomCalendar) => void;
  onCreateClick: () => void;
  onEditClick: (calendar: CustomCalendar) => void;
  onDeleteClick: (calendar: CustomCalendar) => void;
}

export const CalendarList: React.FC<CalendarListProps> = ({
  calendars,
  activeCalendarId,
  onCalendarSelect,
  onCreateClick,
  onEditClick,
  onDeleteClick
}) => {
  return (
    <div className="bg-fjs-charcoal rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-fjs-gold">My Calendars</h3>
        <motion.button
          onClick={onCreateClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-2">
        {calendars.map(calendar => (
          <motion.div
            key={calendar.id}
            initial={false}
            animate={{ 
              backgroundColor: activeCalendarId === calendar.id 
                ? 'rgba(0, 0, 0, 0.2)' 
                : 'transparent'
            }}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-black/20"
          >
            <button
              onClick={() => onCalendarSelect(calendar)}
              className="flex items-center flex-1"
            >
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: calendar.color }}
              />
              <span className="text-white">{calendar.name}</span>
              {calendar.isDefault && (
                <span className="ml-2 text-xs text-fjs-silver">(Default)</span>
              )}
            </button>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => onEditClick(calendar)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-fjs-silver hover:text-fjs-gold"
              >
                <Settings className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => onDeleteClick(calendar)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-fjs-silver hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};