```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, List, Grid, Clock } from 'lucide-react';
import { CalendarView } from '../types';

interface CalendarHeaderProps {
  view: CalendarView;
  onViewChange: (view: CalendarView['type']) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  onViewChange
}) => {
  const views = [
    { type: 'month', icon: Calendar, label: 'Month' },
    { type: 'week', icon: Grid, label: 'Week' },
    { type: 'day', icon: Clock, label: 'Day' },
    { type: 'agenda', icon: List, label: 'Agenda' }
  ] as const;

  return (
    <div className="flex items-center space-x-2 mb-6">
      {views.map(({ type, icon: Icon, label }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewChange(type)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            view.type === type
              ? 'bg-fjs-gold text-black'
              : 'text-fjs-silver hover:bg-black/20'
          }`}
        >
          <Icon className="w-5 h-5 mr-2" />
          <span className="font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};
```