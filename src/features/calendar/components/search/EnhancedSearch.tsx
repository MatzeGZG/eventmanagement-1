```typescript
import React, { useState, useEffect } from 'react';
import { Search, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNaturalLanguageSearch } from '../../hooks/useNaturalLanguageSearch';
import { useStore } from '../../../../store';
import { Event } from '../../../../types/event';

export const EnhancedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const events = useStore(state => state.events);
  const { searchEvents, searchHistory, suggestions, getSuggestions } = useNaturalLanguageSearch(events);
  const [results, setResults] = useState<Event[]>([]);

  useEffect(() => {
    if (query.trim()) {
      getSuggestions(query);
    }
  }, [query, getSuggestions]);

  const handleSearch = async (searchQuery: string) => {
    const searchResults = await searchEvents(searchQuery);
    setResults(searchResults);
  };

  return (
    <div className="relative" data-calendar-search>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Try 'tech events next week' or 'workshops in London'"
          className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (query || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-fjs-charcoal rounded-lg shadow-lg border border-fjs-gold/10 z-50"
          >
            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div className="p-2 border-b border-fjs-charcoal/50">
                <div className="flex items-center text-fjs-silver text-sm mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </div>
                {searchHistory.slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-black/20 rounded-lg"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="flex items-center text-fjs-silver text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-black/20 rounded-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map(event => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-fjs-charcoal p-4 rounded-lg"
            >
              <h3 className="text-fjs-gold font-medium">{event.title}</h3>
              <p className="text-fjs-silver text-sm mt-1">{event.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
```