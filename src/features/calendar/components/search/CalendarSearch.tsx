import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarSearch } from '../../hooks/useCalendarSearch';
import { Event } from '../../../../types/event';

interface CalendarSearchProps {
  onEventSelect: (event: Event) => void;
}

export const CalendarSearch: React.FC<CalendarSearchProps> = ({ onEventSelect }) => {
  const [query, setQuery] = useState('');
  const { searchEvents, loading, results } = useCalendarSearch();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim()) {
      await searchEvents(value);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Try 'tech events next week' or 'all events in London'"
          className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
          data-calendar-search
        />
      </div>

      <AnimatePresence>
        {query && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-fjs-charcoal rounded-lg shadow-lg border border-fjs-gold/10 max-h-96 overflow-y-auto z-50"
          >
            {results.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventSelect(event)}
                className="w-full p-4 text-left hover:bg-black/20 border-b border-fjs-charcoal/50 last:border-b-0"
              >
                <h4 className="text-fjs-gold font-medium">{event.title}</h4>
                <p className="text-sm text-fjs-silver mt-1">{event.description}</p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};