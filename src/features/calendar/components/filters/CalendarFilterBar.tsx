import React from 'react';
import { Filter, List } from 'lucide-react';
import { CalendarFilters } from '../../types';
import { CategoryFilter } from './CategoryFilter';
import { LocationFilter } from './LocationFilter';
import { DateRangeFilter } from './DateRangeFilter';
import { MyFunToggle } from './MyFunToggle';

interface CalendarFilterBarProps {
  filters: CalendarFilters;
  showMyEvents: boolean;
  onFiltersChange: (filters: CalendarFilters) => void;
  onMyFunToggle: (enabled: boolean) => void;
}

export const CalendarFilterBar: React.FC<CalendarFilterBarProps> = ({
  filters,
  showMyEvents,
  onFiltersChange,
  onMyFunToggle
}) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-fjs-gold" />
          <h3 className="text-lg font-semibold text-fjs-gold">Filters</h3>
        </div>
        <MyFunToggle enabled={showMyEvents} onToggle={onMyFunToggle} />
      </div>

      <div className="space-y-4">
        <CategoryFilter
          selectedCategories={filters.categories}
          onChange={categories => onFiltersChange({ ...filters, categories })}
        />
        
        <LocationFilter
          location={filters.location}
          onChange={location => onFiltersChange({ ...filters, location })}
        />
        
        <DateRangeFilter
          dateRange={filters.dateRange}
          onChange={dateRange => onFiltersChange({ ...filters, dateRange })}
        />
      </div>
    </div>
  );
};