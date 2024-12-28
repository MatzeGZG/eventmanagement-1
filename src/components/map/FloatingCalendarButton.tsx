import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';

export const FloatingCalendarButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const events = useStore(state => state.events);
  const todayEvents = events.filter(event => 
    new Date(event.date).toDateString() === new Date().toDateString()
  );

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute bottom-4 right-4 bg-fjs-gold text-black px-4 py-2 rounded-full 
                 shadow-lg flex items-center space-x-2 hover:bg-fjs-light-gold transition-colors"
    >
      <Calendar className="w-5 h-5" />
      <span className="font-medium">Calendar</span>
      {todayEvents.length > 0 && (
        <span className="w-5 h-5 bg-black text-fjs-gold rounded-full flex items-center justify-center text-sm">
          {todayEvents.length}
        </span>
      )}
    </motion.button>
  );
};