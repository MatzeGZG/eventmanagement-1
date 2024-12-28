import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useEventSearch } from '../hooks/useEventSearch';
import { EventSuggestions } from './EventSuggestions';

export const AdvancedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { suggestions, loading, error } = useEventSearch(query);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fjs-gold" />
        <input
          type="text"
          placeholder="What would you like to do? (e.g., 'I will be in London in two weeks')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold focus:border-transparent"
        />
      </div>

      {loading && (
        <div className="mt-4 text-center text-fjs-gold">
          Finding perfect events for you...
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <EventSuggestions suggestions={suggestions} />
      )}
    </div>
  );
};