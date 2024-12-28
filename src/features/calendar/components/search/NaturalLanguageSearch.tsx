```typescript
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useCalendarSearch } from '../../hooks/useCalendarSearch';
import { SearchResults } from './SearchResults';

export const NaturalLanguageSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchEvents, savedFilters, saveFilter } = useCalendarSearch([]);

  const handleSearch = async () => {
    const results = await searchEvents(query);
    // Handle results
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'Show me all tech events next week'"
          className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
        />
      </div>

      {savedFilters.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {savedFilters.map((filter, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-fjs-charcoal text-fjs-gold rounded-full hover:bg-black/20"
            >
              {filter.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```