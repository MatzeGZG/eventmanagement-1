import React, { useState } from 'react';
import { MainSearch } from './MainSearch';
import { SearchFilters } from './SearchFilters';
import { useEventSearch } from '../../features/search/hooks/useEventSearch';
import { useMapContext } from '../../contexts/MapContext';

export const SearchContainer: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { currentView } = useMapContext();
  const {
    query,
    setQuery,
    loading,
    suggestions,
    filters,
    updateFilters,
    searchEvents
  } = useEventSearch();

  // Only show search and filters for events view
  if (currentView !== 'events') {
    return null;
  }

  return (
    <div className="relative z-20">
      <MainSearch
        query={query}
        setQuery={setQuery}
        loading={loading}
        suggestions={suggestions}
        onSearch={searchEvents}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      {showFilters && (
        <div className="absolute w-full mt-2">
          <SearchFilters
            filters={filters}
            onFiltersChange={updateFilters}
          />
        </div>
      )}
    </div>
  );
};