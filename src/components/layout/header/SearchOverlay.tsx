import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEventSearch } from '../../../features/search/hooks/useEventSearch';

interface SearchOverlayProps {
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const { suggestions, loading } = useEventSearch(query);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
    >
      <div className="max-w-3xl mx-auto px-4 pt-20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-fjs-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, people, and experiences..."
            className="w-full pl-14 pr-12 py-4 bg-fjs-charcoal text-white rounded-xl border-2 border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-fjs-silver hover:text-white rounded-full hover:bg-black/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {loading && (
          <div className="text-center text-fjs-silver mt-8">
            Searching...
          </div>
        )}

        {suggestions?.length > 0 && (
          <div className="mt-4 bg-fjs-charcoal rounded-xl overflow-hidden">
            {suggestions.map((result) => (
              <div
                key={result.event.id}
                className="p-4 hover:bg-black/20 transition-colors border-b border-black/20 last:border-b-0"
              >
                <h3 className="text-fjs-gold font-medium">{result.event.title}</h3>
                <p className="text-sm text-fjs-silver mt-1">{result.event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};