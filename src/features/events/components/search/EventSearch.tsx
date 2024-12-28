```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { useEventSearch } from '../../hooks/useEventSearch';
import { EventSearchResults } from './EventSearchResults';
import { EventFilters } from './EventFilters';

export const EventSearch: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { query, setQuery, results, loading, filters, updateFilters } = useEventSearch();

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events by title, location, or category..."
            className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-lg transition-colors ${
            showFilters ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
          }`}
        >
          <Filter className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-fjs-charcoal rounded-lg shadow-lg p-4"
          >
            <EventFilters filters={filters} onFiltersChange={updateFilters} />
          </motion.div>
        )}
      </AnimatePresence>

      <EventSearchResults results={results} loading={loading} />
    </div>
  );
};
```