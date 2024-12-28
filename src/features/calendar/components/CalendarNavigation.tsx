```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarNavigationProps {
  date: Date;
  onPrevious: () => void;
  onNext: () => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  date,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevious}
        className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full hover:bg-black/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <h2 className="text-2xl font-bold text-fjs-gold">
        {format(date, 'MMMM yyyy')}
      </h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full hover:bg-black/20"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
```