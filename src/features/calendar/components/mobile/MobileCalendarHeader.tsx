```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface MobileCalendarHeaderProps {
  date: Date;
  view: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  onDateChange: (date: Date) => void;
}

export const MobileCalendarHeader: React.FC<MobileCalendarHeaderProps> = ({
  date,
  view,
  onViewChange,
  onDateChange
}) => {
  return (
    <motion.div 
      className="bg-black p-4 border-b border-fjs-charcoal"
      initial={false}
      animate={{ height: 'auto' }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onDateChange(new Date())}
          className="flex items-center text-fjs-gold"
        >
          <Calendar className="w-5 h-5 mr-2" />
          <span>Today</span>
        </motion.button>

        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateChange(new Date(date.setMonth(date.getMonth() - 1)))}
            className="p-1 text-fjs-silver hover:text-fjs-gold"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <h2 className="text-xl font-bold text-fjs-gold">
            {format(date, 'MMMM yyyy')}
          </h2>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateChange(new Date(date.setMonth(date.getMonth() + 1)))}
            className="p-1 text-fjs-silver hover:text-fjs-gold"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {(['month', 'week', 'day'] as const).map((v) => (
          <motion.button
            key={v}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange(v)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              view === v 
                ? 'bg-fjs-gold text-black' 
                : 'text-fjs-silver hover:text-fjs-gold'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
```