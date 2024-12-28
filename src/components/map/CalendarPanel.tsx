import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CalendarContainer } from '../calendar/CalendarContainer';

interface CalendarPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30 }}
          className="fixed right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-1/3 bg-black border-l 
                     border-fjs-charcoal shadow-xl z-40"
        >
          <div className="flex items-center justify-between p-4 border-b border-fjs-charcoal">
            <h2 className="text-xl font-semibold text-fjs-gold">Event Calendar</h2>
            <button
              onClick={onClose}
              className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <CalendarContainer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};