import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';
import { useNaturalLanguageSearch } from '../hooks/useNaturalLanguageSearch';
import { SearchResults } from './SearchResults';
import { ChatbotSuggestions } from './ChatbotSuggestions';
import { FilterPanel } from './FilterPanel';

export const EnhancedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const { results, loading, suggestions, searchWithNLP } = useNaturalLanguageSearch();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    await searchWithNLP(searchQuery);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Try 'tech events next week in London' or ask me anything..."
            className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChatbot(!showChatbot)}
          className={`p-3 rounded-lg transition-colors ${
            showChatbot ? 'bg-fjs-gold text-black' : 'text-fjs-gold hover:bg-fjs-charcoal'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showChatbot ? (
          <ChatbotSuggestions onSuggestionSelect={handleSearch} />
        ) : (
          query && <SearchResults results={results} loading={loading} />
        )}
      </AnimatePresence>

      {suggestions.length > 0 && !showChatbot && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-fjs-charcoal rounded-lg shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full px-4 py-2 text-left text-fjs-silver hover:bg-black/20 first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};