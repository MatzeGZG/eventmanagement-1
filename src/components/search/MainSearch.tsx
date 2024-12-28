import React, { useState, useEffect } from 'react';
import { useEventSearch } from '../../features/search/hooks/useEventSearch';
import { SearchInput } from './SearchInput';
import { SearchActions } from './SearchActions';
import { SearchSuggestions } from './SearchSuggestions';

interface MainSearchProps {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  suggestions: any[];
  onSearch: (query: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const MainSearch: React.FC<MainSearchProps> = ({
  query,
  setQuery,
  loading,
  suggestions,
  onSearch,
  showFilters,
  onToggleFilters
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${
        focused ? 'transform -translate-y-4' : ''
      }`}>
        <div className="relative flex items-center">
          <div className="flex-1">
            <SearchInput
              value={query}
              onChange={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
            />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <SearchActions onToggleFilters={onToggleFilters} showFilters={showFilters} />
          </div>
        </div>

        {focused && suggestions.length > 0 && (
          <div className="absolute w-full mt-2 bg-black border border-fjs-gold rounded-lg shadow-xl z-50">
            <SearchSuggestions 
              suggestions={suggestions}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};