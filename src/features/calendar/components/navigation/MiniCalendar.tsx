```typescript
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { motion } from 'framer-motion';

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selectedDate));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="bg-fjs-charcoal rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-black/20 rounded-full text-fjs-silver"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-fjs-gold font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-black/20 rounded-full text-fjs-silver"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div
            key={day}
            className="text-center text-xs text-fjs-silver font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <motion.button
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-full text-sm
              ${isToday(day) ? 'bg-fjs-gold text-black' : ''}
              ${!isSameMonth(day, currentMonth) ? 'text-fjs-silver/50' : 'text-white'}
              ${day.toDateString() === selectedDate.toDateString() ? 'ring-2 ring-fjs-gold' : ''}
              hover:bg-black/20
            `}
          >
            {format(day, 'd')}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
```